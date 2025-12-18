import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

const products = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const productsCategoryFilter = products.filter(
    (product) => product.gender === id
  );
  
  const labels: Record<Category, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Todos',
  };

  // if( id === 'kids' ){
  //   notFound();
  // };

  return (
    <div>
      <Title 
        title={`Artículos para ${labels[id]}`} 
        subtitle='Todos los productos'
      />

      <ProductGrid products={productsCategoryFilter} />
    </div>
  );
}
