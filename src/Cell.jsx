import { useCallback, useMemo } from 'react';
import './Cell.css';
import classNames from 'classnames';

function Cell({ cell, revealCell }) {
  const handleClick = useCallback(e => {
    revealCell(cell.colIdx, cell.rowIdx);
  });

  const revealedStyle = useMemo(() => ({
    'bg-primary': !cell?.isRevealed,
    'bg-primary-subtle': cell?.isRevealed && !cell?.isMined,
    'bg-danger': cell?.isRevealed && cell?.isMined,
  }), [cell?.isRevealed, cell?.isMined]);

  return (
    <>
      <div
        className={classNames('cell rounded-1', revealedStyle)}
        onClick={handleClick}
      />
    </>
  );
}

export default Cell;
