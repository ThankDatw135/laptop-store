import { Router, Request, Response } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { uploadImage } from '../services/cloudinary.service';
import { sendSuccess, sendError } from '../lib/response';
import { asyncHandler } from '../lib/asyncHandler';

const router = Router();

// Configure multer to store file in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

router.post(
  '/product-image',
  authenticate,
  authorize('ADMIN'),
  upload.single('image'),
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      sendError(res, 400, 'Không tìm thấy file ảnh');
      return;
    }

    // Upload to Cloudinary
    const result = await uploadImage(req.file.buffer, 'laptop_store/products');
    
    sendSuccess(res, result, 201);
  })
);

export default router;
