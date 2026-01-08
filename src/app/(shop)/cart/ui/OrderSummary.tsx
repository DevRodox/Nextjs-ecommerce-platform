'use client';

import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const OrderSummary = () => {
  
  const [loaded, setLoaded] = useState(false);
  
  const { subTotal, tax, total, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className='grid grid-cols-2'>
      <span>No. Productos</span>
      <span className='text-right'>
        {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
      </span>

      <span>Subtotal</span>
      <span className='text-right'>${subTotal.toFixed(2)}</span>

      <span>Impuestos (15%)</span>
      <span className='text-right'>${tax.toFixed(2)}</span>

      <span className='text-2xl mt-5'>Total:</span>
      <span className='mt-5 text-2xl text-right'>${total.toFixed(2)}</span>
    </div>
  );
};