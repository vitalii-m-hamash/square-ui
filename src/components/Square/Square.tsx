import React, { useState } from 'react';
import { CellProps, RowProps } from '../../types/types';

import './Square.scss';

const Cell: React.FC<CellProps> = ({
  row,
  col,
  initialColor,
  setHoveredCell,
}) => {
  const [colorTrigger, setColorTrigger] = useState(false);

  const handleCellHover = () => {
    setHoveredCell({ row, col });
    console.log({ row, col });
    setColorTrigger(!colorTrigger);
  };

  return (
    <div
      className='square'
      onMouseEnter={handleCellHover}
      style={{
        backgroundColor: colorTrigger ? 'blue' : initialColor,
      }}
    ></div>
  );
};

const Row: React.FC<RowProps> = ({
  row,
  numCols,
  initialColor,
  setHoveredCell,
}) => {
  const renderCells = () => {
    const cells = [];

    for (let col = 1; col <= numCols; col++) {
      cells.push(
        <Cell
          key={`${row}-${col}`}
          row={row}
          col={col}
          initialColor={initialColor}
          setHoveredCell={setHoveredCell}
        />
      );
    }

    return cells;
  };

  return <div className='row'>{renderCells()}</div>;
};

const Square: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(3);
  const initialColor = 'white';

  const [hoveredCell, setHoveredCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const handleGridSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setGridSize(newSize);
  };

  const renderRows = () => {
    const rows = [];

    for (let row = 1; row <= gridSize; row++) {
      rows.push(
        <Row
          key={row}
          row={row}
          numCols={gridSize}
          initialColor={initialColor}
          setHoveredCell={setHoveredCell}
        />
      );
    }

    return rows;
  };

  return (
    <div>
      <label htmlFor='gridSizeSelect'>Select Grid Size: </label>
      <select id='gridSizeSelect' onChange={handleGridSizeChange}>
        <option value='3'>3x3</option>
        <option value='5'>5x5</option>
        <option value='10'>10x10</option>
      </select>
      <div>{renderRows()}</div>
    </div>
  );
};

export default Square;
