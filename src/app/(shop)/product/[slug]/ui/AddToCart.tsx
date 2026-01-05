'use client';

import { useState } from 'react';

import { SizeSelector, QuantitySelector } from '@/components';
import type { Product, Size } from '@/interfaces';

interface Props{
  product: Product;
};

export const AddToCart = ( { product }: Props ) => {

  const [ size, setSize ] = useState<Size|undefined>();

  return (
    <>
      <SizeSelector
        selectedSize={ size }
        availableSizes={product.sizes}
        onSizeChanged={ setSize }
      />
      {/* Quantity selector */}
      <QuantitySelector quantity={ 2 } />

      {/* Button */}
      <button className='btn-primary my-5'>Agregar al carrito</button>
    </>
  );
};
