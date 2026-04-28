console.log("Etch-A-Sketch loaded!");

let gridSize = 16;
let currentMode = 'normal';
let darkeningLevels = new Map();

const gridContainer = document.getElementById('gridContainer');
const gridSizeBtn = document.getElementById('gridSizeBtn');
const randomColorBtn = document.getElementById('randomColorBtn');
const darkenBtn = document.getElementById('darkenBtn');
const resetBtn = document.getElementById('resetBtn');

function createGrid(size) {
    gridContainer.innerHTML = '';
    darkeningLevels.clear();
    
    const containerSize = 960;
    const squareSize = containerSize / size;
    const totalSquares = size * size;
    
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.style.backgroundColor = 'white';
        
        darkeningLevels.set(square, 0);
        
        square.addEventListener('mouseenter', () => {
            if (currentMode === 'normal') {
                square.style.backgroundColor = 'black';
            } 
            else if (currentMode === 'random') {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            }
            else if (currentMode === 'darken') {
                let currentLevel = darkeningLevels.get(square) || 0;
                if (currentLevel < 10) {
                    currentLevel++;
                    darkeningLevels.set(square, currentLevel);
                    const darkness = currentLevel / 10;
                    const shade = Math.floor(255 * (1 - darkness));
                    square.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
                }
            }
        });
        
        gridContainer.appendChild(square);
    }
    
    console.log(`${size}x${size} grid created`);
}

function changeGridSize() {
    let newSize = prompt('Enter number of squares per side (max 100):', gridSize);
    newSize = parseInt(newSize);
    
    if (isNaN(newSize) || newSize < 1) {
        alert('Please enter a valid number greater than 0!');
        return;
    }
    
    if (newSize > 100) {
        alert('Maximum size is 100! Setting to 100.');
        newSize = 100;
    }
    
    gridSize = newSize;
    createGrid(gridSize);
}

// Button event listeners
gridSizeBtn.addEventListener('click', changeGridSize);

if (randomColorBtn) {
    randomColorBtn.addEventListener('click', () => {
        currentMode = 'random';
        console.log('Random color mode - each hover generates random RGB');
    });
}

if (darkenBtn) {
    darkenBtn.addEventListener('click', () => {
        currentMode = 'darken';
        console.log('Darken mode - each hover darkens by 10%');
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        const squares = document.querySelectorAll('.grid-square');
        squares.forEach(square => {
            square.style.backgroundColor = 'white';
            darkeningLevels.set(square, 0);
        });
        currentMode = 'normal';
        console.log('Grid reset to white, normal mode activated');
    });
}

// Initialize grid
createGrid(gridSize);