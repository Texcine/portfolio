"use client";
import { useState, useEffect, useRef } from 'react';

// --- Configurações da Animação ---
const ROWS = 6;            // Altura de cada "aquário" nos cantos
const BLOCK_SIZE = 16;     // Tamanho de cada quadrado em pixels (aumentei um pouco para ficar mais visível)
const FALL_INTERVAL = 150; // Velocidade de queda em milissegundos
const COLORS = ['#00FFFF', '#800080', '#FF0000', '#00FF00', '#FFA500']; // Ciano, Roxo, Rosa, Esmeralda, Amarelo

// --- Hook Customizado para a Lógica da Animação ---
// Isso nos permite rodar duas animações independentes com a mesma lógica.
const useBlockAnimation = (cols: number) => {
    // State para os blocos que já se empilharam
    const [grid, setGrid] = useState(() => Array.from({ length: ROWS }, () => Array(cols).fill(0)));
    // State para o bloco que está caindo
    const [particle, setParticle] = useState({ x: 0, y: 0, color: 1 });

    const logic = useRef({
        dropCounter: 0,
        lastTime: 0,
    }).current;
    
    // Função para criar um novo bloco caindo
    const resetParticle = () => {
        setParticle({
            x: Math.floor(Math.random() * cols),
            y: 0,
            color: Math.floor(Math.random() * COLORS.length) + 1,
        });
    };

    // Efeito para iniciar a animação
    useEffect(() => {
        resetParticle(); // Cria a primeira partícula
    }, []);

    // Loop principal da animação
    useEffect(() => {
        let animationFrameId: number;

        const update = (time = 0) => {
            const deltaTime = time - logic.lastTime;
            logic.lastTime = time;
            logic.dropCounter += deltaTime;

            if (logic.dropCounter > FALL_INTERVAL) {
                setParticle(p => {
                    const newY = p.y + 1;
                    
                    // Verifica a colisão (com o chão ou com outro bloco)
                    const hasCollided = newY >= ROWS || grid[newY][p.x] !== 0;

                    if (hasCollided) {
                        // 1. "Congela" o bloco no grid
                        const newGrid = grid.map(row => [...row]);
                        if (p.y >= 0 && p.y < ROWS) {
                           newGrid[p.y][p.x] = p.color;
                        }

                        // 2. Verifica se a linha onde o bloco caiu está completa
                        const landedRow = newGrid[p.y];
                        const isLineComplete = landedRow && landedRow.every(cell => cell !== 0);

                        if (isLineComplete) {
                            // 3. Se a linha está completa, remove-a e adiciona uma nova no topo
                            newGrid.splice(p.y, 1);
                            newGrid.unshift(Array(cols).fill(0));
                        }
                        
                        setGrid(newGrid);
                        resetParticle(); // Cria um novo bloco caindo
                        return { ...p, y: 0 }; // Reseta a posição para o próximo frame
                    }
                    
                    return { ...p, y: newY }; // Continua caindo
                });
                logic.dropCounter = 0;
            }
            animationFrameId = requestAnimationFrame(update);
        };

        update();
        return () => cancelAnimationFrame(animationFrameId);
    }, [grid, logic]);

    return { grid, particle };
};

// --- Componente de Renderização de Bloco Individual ---
const Block = ({ x, y, colorIndex }: { x: number, y: number, colorIndex: number }) => (
    <div
        className="absolute rounded-sm"
        style={{
            left: x * BLOCK_SIZE,
            top: y * BLOCK_SIZE,
            width: BLOCK_SIZE - 1,
            height: BLOCK_SIZE - 1,
            backgroundColor: COLORS[colorIndex - 1],
            boxShadow: `0 0 6px ${COLORS[colorIndex - 1]}`,
            transition: 'top 0.1s linear', // Suaviza a queda
        }}
    />
);

// --- Componente Principal do Rodapé ---
export default function TetrisFooter() {
    const COLS_PER_SIDE = 8; // Define a largura de cada área de animação
    const { grid: leftGrid, particle: leftParticle } = useBlockAnimation(COLS_PER_SIDE);
    const { grid: rightGrid, particle: rightParticle } = useBlockAnimation(COLS_PER_SIDE);

    const animationAreaHeight = ROWS * BLOCK_SIZE;

    return (
        <footer className="relative border-t border-violet-500/20 pt-10 pb-6 overflow-hidden">
            
            {/* Área de Animação da Esquerda */}
            <div className="absolute bottom-6 left-4 pointer-events-none" style={{ width: COLS_PER_SIDE * BLOCK_SIZE, height: animationAreaHeight }}>
                {/* Renderiza blocos empilhados */}
                {leftGrid.map((row, y) => row.map((colorIndex, x) => colorIndex !== 0 && <Block key={`${y}-${x}`} x={x} y={y} colorIndex={colorIndex} />))}
                {/* Renderiza bloco caindo */}
                <Block x={leftParticle.x} y={leftParticle.y} colorIndex={leftParticle.color} />
            </div>

            {/* Área de Animação da Direita */}
            <div className="absolute bottom-6 right-4 pointer-events-none" style={{ width: COLS_PER_SIDE * BLOCK_SIZE, height: animationAreaHeight }}>
                 {/* Renderiza blocos empilhados */}
                {rightGrid.map((row, y) => row.map((colorIndex, x) => colorIndex !== 0 && <Block key={`${y}-${x}`} x={x} y={y} colorIndex={colorIndex} />))}
                {/* Renderiza bloco caindo */}
                <Block x={rightParticle.x} y={rightParticle.y} colorIndex={rightParticle.color} />
            </div>

            {/* Texto centralizado */}
            <div className="relative z-10 text-center text-gray-400">
                <p className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 mb-1">
                    LEVEL COMPLETE
                </p>
                <p>© {new Date().getFullYear()} Ernandes Dias — Game Dev & Professor.</p>
            </div>
        </footer>
    );
}