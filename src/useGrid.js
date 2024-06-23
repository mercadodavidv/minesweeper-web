import { useCallback, useState } from 'react';
import { randomInt } from './utils.js';

// Relative coordinates that surround a cell.
const surroundingDirections = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1],  [0, 1],  [1, 1],
];

function initializeCell(x, y) {
  return Object({ isRevealed: false, isMined: false, colIdx: x, rowIdx: y, nearbyMineCount: 0, isFlagged: false });
}

function initializeGrid(columns = 10, rows = 10, mines = 10) {
  const grid = Array.from({ length: rows }).fill(Array.from({ length: columns })).map((row, rowIdx) => row.map((cell, colIdx) => initializeCell(colIdx, rowIdx)));
  for (let i = 0; i < mines; i++) {
    const randomX = randomInt(0, columns);
    const randomY = randomInt(0, rows);
    grid[randomY][randomX].isMined = true;
    surroundingDirections.forEach(direction => {
      const adjacentCell = grid[randomY + direction[1]]?.[randomX + direction[0]];
      if (adjacentCell) {
        adjacentCell.nearbyMineCount += 1;
      }
    });
  }
  return grid;
}

export function useGrid(columns = 10, rows = 10, mines = 10) {
  const [grid, setGrid] = useState(initializeGrid(columns, rows, mines));

  const revealCell = useCallback((x, y) => {
    setGrid(grid => {
      // Recursively flood to adjacent cells.
      const revealAdjacent = (x, y) => {
        const currentCell = grid[y]?.[x];

        // Base case.
        if (currentCell?.nearbyMineCount > 0 || currentCell?.isMined) {
          return;
        }

        // Recursive case.
        surroundingDirections.forEach(direction => {
          const adjacentX = x + direction[0];
          const adjacentY = y + direction[1];
          const adjacentCell = grid[adjacentY]?.[adjacentX];
          if (adjacentCell && !adjacentCell.isRevealed && !adjacentCell.isFlagged) {
            grid[adjacentY][adjacentX].isRevealed = true;
            revealAdjacent(adjacentX, adjacentY);
          }
        });
      };
      revealAdjacent(x, y);

      // Reveal the cell that was clicked.
      grid[y][x].isRevealed = true;

      return [...grid];
    });
  }, []);

  const flagCell = useCallback((x, y, newFlag) => {
    setGrid(grid => {
      // Flag the cell that was clicked.
      grid[y][x].isFlagged = newFlag;

      return [...grid];
    });
  }, []);

  const resetGrid = useCallback((columns = 10, rows = 10, mines = 10) => {
    setGrid(initializeGrid(columns, rows, mines));
  }, []);

  return [grid, revealCell, flagCell, resetGrid];
}
