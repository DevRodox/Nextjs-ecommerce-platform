import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { initialData } from './seed';

async function main() {

  await prisma.$transaction(async (tx) => {

    // 1️. Borrar datos previos
    await tx.productImage.deleteMany();
    await tx.product.deleteMany();
    await tx.category.deleteMany();
    
    await tx.session.deleteMany(); 
    await tx.account.deleteMany(); 
    await tx.user.deleteMany();

    const { categories, products, users } = initialData;

    // 2. Insertar usuarios

    for (const user of users) {
      const { password, ...userData } = user;

      const ctx = await auth.$context;

      const hashed = await ctx.password.hash(password);

      const dbUser = await tx.user.create({
        data: {
          ...userData,
          emailVerified: true,
        },
      });

      await tx.account.create({
        data: {
          userId: dbUser.id,        
          accountId: user.email,    
          providerId: "credential", 
          password: hashed,
        },
      });
    }
    // 3. Crear categorías
    await tx.category.createMany({
      data: categories.map(name => ({ name })),
    });

    // 4. Mapear categorías
    const categoriesDB = await tx.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
      map[category.name.toLowerCase()] = category.id;
      return map;
    }, {} as Record<string, string>);

    
    // 5. Crear productos + imágenes
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
