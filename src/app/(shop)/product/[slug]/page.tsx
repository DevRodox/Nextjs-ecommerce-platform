export const revalidate = 604800;
import { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/actions';
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  StockLabel,
} from '@/components';
import { titleFont } from '@/config/fonts';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);
  
  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${ product?.images[1] }`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2'>
        {/* Mobile Slideshow */}
        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className='block md:hidden'
        />

        {/* Desktop Slideshow */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className='hidden md:block'
        />
      </div>

      {/* Details */}
      <div className='col-span-1 px-5'>
        <StockLabel slug={product.slug} />
        <h1 className={`${ titleFont.className } antialised font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${ product.price }</p>

        <AddToCart product={ product }/>

        {/* Description */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{ product.description }</p>
      </div>
    </div>
  );
}
