import { Request, Response } from 'express';
import { asyncHandler } from '../lib/asyncHandler';
import { sendSuccess } from '../lib/response';

export const getCategories = asyncHandler(async (_req: Request, res: Response) => {
  // Hardcoded for now based on Prisma Category Enum
  const categories = [
    { slug: 'gaming', name: 'Laptop Gaming' },
    { slug: 'office', name: 'Laptop Văn Phòng' },
    { slug: 'student', name: 'Laptop Sinh Viên' },
    { slug: 'workstation', name: 'Máy Trạm (Workstation)' },
  ];
  
  sendSuccess(res, categories);
});

export const getCategoryBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  
  const mapping: Record<string, string> = {
    'gaming': 'Laptop Gaming',
    'office': 'Laptop Văn Phòng',
    'student': 'Laptop Sinh Viên',
    'workstation': 'Máy Trạm (Workstation)',
  };

  if (!mapping[slug]) {
    res.status(404).json({ success: false, message: 'Danh mục không tồn tại' });
    return;
  }

  sendSuccess(res, { slug, name: mapping[slug] });
});
