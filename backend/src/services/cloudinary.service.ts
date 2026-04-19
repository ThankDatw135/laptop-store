import { v2 as cloudinary } from 'cloudinary';
import { env } from '../lib/env';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
  fileBuffer: Buffer,
  folder: string = 'laptop_store/products'
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const defaultTransformations = [
      { fetch_format: 'auto', quality: 'auto' }, // Tự động convert thành WebP/AVIF và nén
      { width: 1200, crop: 'limit' } // Resize chiều rộng tối đa 1200px
    ];

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: defaultTransformations,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary result is empty'));
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export const deleteImage = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};
