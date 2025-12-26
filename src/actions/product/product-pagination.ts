'use server';

import prisma from "@/lib/prisma";

export const getPaginatedProductsWithImages = async() => {
  try {
    
    const products = await prisma.product.findMany({
      include: {
        productImages: {
          take: 2,
          select: {
            url: true
          }
        }
      }
    });

    return {
      products: products.map( product => ({
        ...product, 
        images: product.productImages.map( image => image.url )
      }))
    };
  } catch (error) {
    console.error( error );
    throw new Error('No se pudo cargar los productos');
  };
};