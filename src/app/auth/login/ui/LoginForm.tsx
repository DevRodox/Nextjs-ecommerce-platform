'use client';

import Link from 'next/link';
import { signIn } from '@/lib/auth-client'; 
import { useState } from 'react';
import clsx from 'clsx';

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const rememberMe = formData.get('rememberMe') === 'on';

    await signIn.email({
      email,
      password,
      rememberMe,
      callbackURL: '/',
    }, {
      onError: (ctx) => {
        setError(ctx.error.message);
      }
    });
    setIsPending( false );
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
        required
      />

      <label htmlFor='password'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        name='password'
        required
      />

      <div className='flex items-center mb-5'>
        <input type='checkbox' name='rememberMe' id='rememberMe' />
        <label htmlFor='rememberMe' className='ml-2'>Recordarme</label>
      </div>

      {error && <p className='text-red-500 mb-3'>{error}</p>}

      <button 
        type='submit' 
        className={ clsx({
          'btn-primary': !isPending,
          'btn-disabled': isPending
        })}
        disabled={isPending}
      >
        {isPending ? 'Ingresando...' : 'Ingresar'}
      </button>

      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Crear una nueva cuenta
      </Link>
    </form>
  );
};