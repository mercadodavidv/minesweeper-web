import { useCallback, useState } from 'react';
import { randomInt } from './utils.js';

function initializeCell(colIdx, rowIdx) {
  return Object({ isRevealed: false, isMined: false, colIdx: colIdx, rowIdx: rowIdx });
}

function initializeGrid(rows = 10, columns = 10, mines = 10) {
  const grid = Array.from({ length: rows }).fill(Array.from({ length: columns })).map((row, rowIdx) => row.map((cell, colIdx) => initializeCell(colIdx, rowIdx)));
  for (let i = 0; i < mines; i++) {
    const randomX = randomInt(0, columns);
    const randomY = randomInt(0, rows);
    grid[randomY][randomX].isMined = true;
  }
  return grid;
}

export function useGrid(rows = 10, columns = 10, mines = 10) {
  const [grid, setGrid] = useState(initializeGrid(rows, columns, mines));

  const revealCell = useCallback((colIdx, rowIdx) => {
    setGrid(currentGrid => {
      // Reveal the cell that was clicked.
      currentGrid[rowIdx][colIdx].isRevealed = true;

      return [...currentGrid];
    });
  });

  const resetGrid = useCallback((rows = 10, columns = 10, mines = 10) => {
    setGrid(initializeGrid(rows, columns, mines));
  });

  return [grid, revealCell, resetGrid];
}
