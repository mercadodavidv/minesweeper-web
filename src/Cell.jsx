import { useCallback, useEffect, useMemo, useRef } from 'react';
import './Cell.css';
import classNames from 'classnames';

function Cell({ cell, revealCell, flagCell }) {
  const toggleFlag = useCallback(() => {
    flagCell(cell.colIdx, cell.rowIdx, !cell.isFlagged);
  }, [flagCell, cell.colIdx, cell.rowIdx]);

  const revealedStyle = useMemo(() => ({
    revealed: cell.isRevealed,
    'bg-primary': !cell.isRevealed,
    'bg-primary-subtle': cell.isRevealed && !cell.isMined,
    'bg-danger': cell.isRevealed && cell.isMined,
  }), [cell.isRevealed, cell.isMined]);

  // Handle click + hold. Should be replaced with useEffectEvent whenever it's released.
  // TODO: Should probably move this to a hook to customize the ref and hold duration.
  const cellRef = useRef(null);
  useEffect(() => {
    const currentCellRef = cellRef.current;

    let timer = null;
    let isDown = false;
    const cancelHold = () => {
      clearTimeout(timer);
      timer = null;
    };
    const endHold = (e) => {
      if (isDown) {
        if (timer) {
          if (e.button === 0) {
            // Primary single press
            if (cell.isFlagged) {
              // TODO: toggle between flag and question mark
            } else {
              revealCell(cell.colIdx, cell.rowIdx);
            }
          } else {
            // Secondary single press
            toggleFlag();
          }
        } else {
          // Primary or secondary long press
          toggleFlag();
        }
        clearTimeout(timer);
        timer = null;
        isDown = false;
      }
    };
    const beginHold = (e) => {
      isDown = true;
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        endHold(e);
      }, 500);
    };
    const preventDefault = (e) => {
      e.preventDefault();
    };

    currentCellRef.addEventListener('pointerdown', beginHold);
    currentCellRef.addEventListener('pointerup', endHold);
    currentCellRef.addEventListener('pointerleave', cancelHold);
    currentCellRef.addEventListener('touchend', preventDefault);
    currentCellRef.addEventListener('contextmenu', preventDefault);
    return () => {
      currentCellRef.removeEventListener('pointerdown', beginHold);
      currentCellRef.removeEventListener('pointerup', endHold);
      currentCellRef.removeEventListener('pointerleave', cancelHold);
      currentCellRef.removeEventListener('touchend', preventDefault);
      currentCellRef.removeEventListener('contextmenu', preventDefault);
      clearTimeout(timer);
    };
  }, [cell.isFlagged, toggleFlag]);

  return (
    <>
      <div
        className={classNames('cell rounded-1 position-relative', revealedStyle)}
        ref={cellRef}
      >
        {cell.isRevealed && !cell.isMined && cell.nearbyMineCount > 0 &&
          <span className='position-absolute start-50 top-50 translate-middle pe-none'>
            <strong>{cell.nearbyMineCount}</strong>
          </span>
        }
        {!cell.isRevealed && cell.isFlagged &&
          <span className='position-absolute start-50 top-50 translate-middle pe-none'>
            <i className='bi bi-flag-fill'></i>
          </span>
        }
      </div>
    </>
  );
}

export default Cell;
