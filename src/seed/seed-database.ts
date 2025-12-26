import prisma from '@/lib/prisma';
import { initialData } from './seed';

async function main() {

  await prisma.$transaction(async (tx) => {

    // 1️. Borrar datos previos
    await tx.productImage.deleteMany();
    await tx.product.deleteMany();
    await tx.category.deleteMany();

    const { categories, products } = initialData;

    // 2️. Crear categorías
    await tx.category.createMany({
      data: categories.map(name => ({ name })),
    });

    // 3️. Mapear categorías
    const categoriesDB = await tx.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
      map[category.name.toLowerCase()] = category.id;
      return map;
    }, {} as Record<string, string>);

    
    // 4️. Crear productos + imágenes
    for (const product of products) {
      const { type, images, ...rest } = product;

      const dbProduct = await tx.product.create({
        data: {
          ...rest,
          categoryId: categoriesMap[type],
        },
      });

      await tx.productImage.createMany({
        data: images.map(url => ({
          url,
          productId: dbProduct.id,
        })),
      });
    }
  });
};

// Evitar ejecución en producción
if (process.env.NODE_ENV !== 'production') {
  main()
    .catch(err => {
      console.error('❌ Error en el seed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
