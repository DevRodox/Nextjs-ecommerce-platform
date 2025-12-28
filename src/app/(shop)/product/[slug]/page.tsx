export const revalidate = 604800;

import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/actions';
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from '@/components';
import { titleFont } from '@/config/fonts';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug( slug );

  if (!product) {
    notFound();
  }

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2'>        
    
        {/* Mobile Slideshow */}
        <ProductMobileSlideShow 
          title={ product.title }
          images={ product.images }
          className='block md:hidden'
        />

        {/* Desktop Slideshow */}
        <ProductSlideShow 
          title={ product.title }
          images={ product.images }
          className='hidden md:block' 
        />
      </div>

      {/* Details */}
      <div className='col-span-1 px-5'>
        <h1 className={`${ titleFont.className } antialised font-bold text-xl`}>
          { product.title }
        </h1>
        <p className='text-lg mb-5'>${ product.price }</p>

        {/* Sizes selector */}
        <SizeSelector 
          selectedSize={ product.sizes[0] }
          availableSizes={ product.sizes }
        />
        {/* Quantity selector */}
        <QuantitySelector 
          quantity={ 2 }
        />
      
        {/* Button */}
        <button className='btn-primary my-5'>
          Agregar al carrito
        </button>

        {/* Description */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>
          { product.description }
        </p>
      </div>
    </div>
  );
}
