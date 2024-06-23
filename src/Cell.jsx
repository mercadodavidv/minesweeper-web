import { useCallback, useMemo } from 'react';
import './Cell.css';
import classNames from 'classnames';

function Cell({ cell, revealCell }) {
  const handleClick = useCallback(e => {
    revealCell(cell.colIdx, cell.rowIdx);
  });

  const revealedStyle = useMemo(() => ({
    revealed: cell.isRevealed,
    'bg-primary': !cell.isRevealed,
    'bg-primary-subtle': cell.isRevealed && !cell.isMined,
    'bg-danger': cell.isRevealed && cell.isMined,
  }), [cell.isRevealed, cell.isMined]);

  return (
    <>
      <div
        className={classNames('cell rounded-1 position-relative', revealedStyle)}
        onClick={handleClick}
      >
        {cell.isRevealed && !cell.isMined && cell.nearbyMineCount > 0 &&
          <span className='position-absolute start-50 top-50 translate-middle pe-none'>
            <strong>{cell.nearbyMineCount}</strong>
          </span>
        }
      </div>
    </>
  );
}

export default Cell;
