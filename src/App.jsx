import Cell from './Cell.jsx';
import { useGrid } from './useGrid.js';

function App() {
  const [grid, revealCell, resetGrid] = useGrid();

  return (
    <>
      <div className='position-relative'>
        <div className='position-absolute start-50 top-50 translate-middle-x' style={{ display: 'grid', grid: `auto-flow / repeat(${grid.length}, auto)`, gap: '0.5rem'}}>
          {grid.map((row, rowIdx) =>
            row.map((cell, colIdx) =>
              <Cell key={rowIdx + colIdx} className='d-inline' cell={cell} revealCell={revealCell} />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
