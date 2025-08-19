"use client";
import { useState, useEffect, useRef } from 'react';

// --- Configurações da Animação ---
const COLS = 12;
const ROWS = 3;
const BLOCK_SIZE = 8;
const GAME_SPEED = 200;
const MAX_SNAKE_LENGTH = 15;

type Position = { x: number; y: number; };

// --- Hook Customizado para a Lógica da Cobrinha ---
const useSnakeAnimation = () => {
    const getInitialSnake = (): Position[] => [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }];

    const [snake, setSnake] = useState<Position[]>(getInitialSnake);
    const [food, setFood] = useState<Position>({ x: 0, y: 0 });
    const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });

    const stateRef = useRef({ snake, food, direction });
    stateRef.current = { snake, food, direction };

    const logic = useRef({
        gameTicker: 0,
        lastTime: 0,
    }).current;

    const generateFood = (currentSnake: Position[]) => {
        let newFoodPos: Position;
        do {
            newFoodPos = {
                x: Math.floor(Math.random() * COLS),
                y: Math.floor(Math.random() * ROWS),
            };
        } while (currentSnake.some(segment => segment.x === newFoodPos.x && segment.y === newFoodPos.y));
        setFood(newFoodPos);
    };

    useEffect(() => {
        generateFood(getInitialSnake());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    // NOVO: A "Inteligência" da Cobra
    const getNewDirection = (head: Position, food: Position, currentDir: Position): Position => {
        const deltaX = food.x - head.x;
        const deltaY = food.y - head.y;

        let possibleMoves: Position[] = [
            { x: 1, y: 0 },  // Direita
            { x: -1, y: 0 }, // Esquerda
            { x: 0, y: 1 },  // Baixo
            { x: 0, y: -1 }, // Cima
        ];

        // Impede a cobra de voltar sobre si mesma
        possibleMoves = possibleMoves.filter(move => move.x !== -currentDir.x || move.y !== -currentDir.y);

        // Remove movimentos que levariam a uma colisão com a parede
        possibleMoves = possibleMoves.filter(move => {
            const nextX = head.x + move.x;
            const nextY = head.y + move.y;
            return nextX >= 0 && nextX < COLS && nextY >= 0 && nextY < ROWS;
        });

        if (possibleMoves.length === 0) return currentDir; // Se estiver presa, continua na mesma direção

        // Ordena os movimentos possíveis com base na distância até a comida (o melhor fica em primeiro)
        possibleMoves.sort((a, b) => {
            const distA = Math.abs(head.x + a.x - food.x) + Math.abs(head.y + a.y - food.y);
            const distB = Math.abs(head.x + b.x - food.x) + Math.abs(head.y + b.y - food.y);
            return distA - distB;
        });
        
        // 75% de chance de fazer o melhor movimento, 25% de chance de fazer um movimento aleatório (válido)
        if (Math.random() < 0.75) {
            return possibleMoves[0];
        } else {
            return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        }
    };


    useEffect(() => {
        let animationFrameId: number;

        const update = (time = 0) => {
            const deltaTime = time - logic.lastTime;
            logic.lastTime = time;
            logic.gameTicker += deltaTime;

            if (logic.gameTicker > GAME_SPEED) {
                const { snake, food, direction } = stateRef.current;
                
                let newSnake = [...snake];
                if (newSnake.length === 0) newSnake = getInitialSnake();

                const head = { ...newSnake[0] };

                // ATUALIZADO: A cobra agora decide para onde ir
                const newDirection = getNewDirection(head, food, direction);
                setDirection(newDirection);

                head.x += newDirection.x;
                head.y += newDirection.y;

                newSnake.unshift(head);
                
                if (head.x === food.x && head.y === food.y) {
                    generateFood(newSnake);
                    if (newSnake.length > MAX_SNAKE_LENGTH) {
                        newSnake = getInitialSnake();
                    }
                } else {
                    newSnake.pop();
                }
                
                setSnake(newSnake);
                logic.gameTicker = 0;
            }
            animationFrameId = requestAnimationFrame(update);
        };

        update();
        return () => cancelAnimationFrame(animationFrameId);
    }, [logic]);

    return { snake, food };
};

// --- Componentes de Renderização (sem alterações) ---
const Block = ({ x, y, color }: { x: number, y: number, color: string }) => (
    <div className="absolute rounded-sm" style={{ left: x * BLOCK_SIZE, top: y * BLOCK_SIZE, width: BLOCK_SIZE, height: BLOCK_SIZE, backgroundColor: color, boxShadow: `0 0 5px ${color}` }} />
);

const SnakeInstance = () => {
    const { snake, food } = useSnakeAnimation();
    return (
        <div className="relative" style={{ width: COLS * BLOCK_SIZE, height: ROWS * BLOCK_SIZE }}>
            <Block x={food.x} y={food.y} color="#FF0000" /> 
            {snake.map((segment, index) => (
                <Block key={index} x={segment.x} y={segment.y} color="#00FF00" />
            ))}
        </div>
    );
};

// --- Componente Principal (sem alterações) ---
export default function SnakeHeaderAnimation() {
    return (
        <>
            <div className="absolute bottom-2 left-4 pointer-events-none opacity-60"><SnakeInstance /></div>
            <div className="absolute bottom-2 right-4 pointer-events-none opacity-60"><SnakeInstance /></div>
        </>
    );
}