import { notFound, redirect } from 'next/navigation';
import { Gender } from 'generated/prisma/client';
import { getPaginatedProductsWithImages }  from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';


interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderPage({ params, searchParams }: Props) {
  
  const { gender } = await params;
  const { page: pageParam } = await searchParams; 
  const page = parseInt( pageParam ?? '1' );

  const { products, totalPages } = await getPaginatedProductsWithImages({ 
    page, 
    gender: gender as Gender 
  });

  const labels: Record<string, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Todos',
  };

  if( products.length === 0){
    redirect(`/gender/${ gender }`);
  };

  // if( id === 'kids' ){
  //   notFound();
  // };

  return (
    <div>
      <Title 
        title={`Artículos para ${labels[gender]}`} 
        subtitle='Todos los productos'
      />

      <ProductGrid 
        products={ products } 
      />

      <Pagination 
        totalPages={ totalPages }
      />
    </div>
  );
}
