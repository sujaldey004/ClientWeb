// Constants
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const BLOCK_SIZE = 10;
const GRID_WIDTH = CANVAS_WIDTH / BLOCK_SIZE;
const GRID_HEIGHT = CANVAS_HEIGHT / BLOCK_SIZE;
const EMPTY_BLOCK = 'empty';
const SNAKE_BLOCK = 'snake';
const FOOD_BLOCK = 'food';

// Variables
let direction = 'right';
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let score = 0;

// Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game loop
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Update snake position
    snake.forEach((block, index) => {
        if (index === 0) {
            switch (direction) {
                case 'up':
                    block.y -= BLOCK_SIZE;
                    break;
                case 'down':
                    block.y += BLOCK_SIZE;
                    break;
                case 'left':
                    block.x -= BLOCK_SIZE;
                    break;
                case 'right':
                    block.x += BLOCK_SIZE;
                    break;
            }
        }

        if (block.x < 0 || block.x >= GRID_WIDTH || block.y < 0 || block.y >= GRID_HEIGHT) {
            // Game over
            alert(`Game over! Your score: ${score}`);
            snake = [{ x: 10, y: 10 }];
            direction = 'right';
            score = 0;
        }

        // Check collision with snake body
        for (let i = 1; i < snake.length; i++) {
            if (block.x === snake[i].x && block.y === snake[i].y) {
                // Game over
                alert(`Game over! Your score: ${score}`);
                snake = [{ x: 10, y: 10 }];
                direction = 'right';
                score = 0;
            }
        }

        // Draw blocks on canvas
        ctx.fillStyle =
            block.x === food.x && block.y === food.y
                ? 'red'
                : block.x === snake[0].x && block.y === snake[0].y
                ? 'green'
                : EMPTY_BLOCK;
        ctx.fillRect(block.x * BLOCK_SIZE, block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    });

    // Draw food
    ctx.fillStyle = 'yellow';
    ctx.fillRect(food.x * BLOCK_SIZE, food.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}