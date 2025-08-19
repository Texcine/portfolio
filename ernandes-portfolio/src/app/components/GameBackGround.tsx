"use client";

import { useMemo } from 'react';

// Gera um número aleatório em um intervalo
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Componente para o fundo animado
export default function GameBackground() {
  const blocks = useMemo(() => {
    // Crie um array de 25 elementos para gerar 25 blocos
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      // Posição horizontal aleatória
      left: `${random(5, 95)}%`, 
      // Duração da animação aleatória
      animationDuration: `${random(15, 30)}s`,
      // Atraso para começar a animação, para que não caiam todos juntos
      animationDelay: `${random(0, 20)}s`,
      // Tamanho do bloco
      size: `${random(15, 50)}px`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gray-950">
      {blocks.map((block) => (
        <span
          key={block.id}
          className="block absolute bg-cyan-500/10 animate-fall rounded-md"
          style={{
            left: block.left,
            width: block.size,
            height: block.size,
            animationDuration: block.animationDuration,
            animationDelay: block.animationDelay,
          }}
        />
      ))}
    </div>
  );
}