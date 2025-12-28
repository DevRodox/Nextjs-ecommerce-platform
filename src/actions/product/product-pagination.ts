'use server';

import prisma from '@/lib/prisma';
import { Category } from '@/interfaces';
import { Gender } from 'generated/prisma/enums';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    
    //1. Obtener los productos y el totalCount 

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        include: {
          productImages: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
        take,
        skip: (page - 1) * take,
        where: {
          gender
        }
      }),
      prisma.product.count({ where:{ gender }}),
    ]);

    //2. Obtener el total de páginas
    //todo:
    const totalPages = Math.ceil(totalCount / take);

    return {
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.productImages.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo cargar los productos');
  }
};
