'use client';

export default function Title({ username }: { username:string }) {
  return (
    <h1 className="text-4xl md:text-5xl font-bold mb-8">
      Hola de nuevo
      {' '}
      @
      {username}
      !
    </h1>
  );
}
