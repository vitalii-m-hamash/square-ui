import React, { useEffect, useState } from 'react';
import { CellProps, RowProps } from './types';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

import { getModes } from './services/squareServices';
import {
  addNewNotification,
  changeMode,
  resetNotifications,
  selectModes,
} from './squareSlice';
import { Button, Select } from 'antd';
import Notifications from '../Notifications/Notifications';

import './Square.scss';

const Cell: React.FC<CellProps> = ({
  row,
  col,
  initialColor,
  setHoveredCell,
}) => {
  const [colorTrigger, setColorTrigger] = useState(false);

  const dispatch = useAppDispatch();
  const square = useAppSelector(selectModes);

  const handleCellHover = () => {
    setHoveredCell({ row, col });
    console.log({ row, col });
    setColorTrigger(!colorTrigger);
    dispatch(addNewNotification({ row, col }));
  };

  useEffect(() => {
    setColorTrigger(false);
    console.log(square.mode);
  }, [square.mode]);

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
  const [gridSize, setGridSize] = useState<number>(0);
  const [modeOption, setMode] = useState<number>(0);

  const initialColor = 'white';

  const [hoveredCell, setHoveredCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const dispatch = useAppDispatch();
  const square = useAppSelector(selectModes);

  const handleGridSizeChange = () => {
    setGridSize(modeOption);
    dispatch(resetNotifications());
    dispatch(changeMode(modeOption));
  };

  const handleMode = (value: string) => {
    const newSize = parseInt(value, 10);
    setMode(newSize);
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

  useEffect(() => {
    dispatch(getModes());
  }, []);

  return (
    <section className='gridContainer'>
      <section className='mainInfo'>
        <Select
          placeholder='Pick Mode'
          style={{ width: 220 }}
          loading={square.loading}
          onChange={handleMode}
          options={square.modes.map((item) => ({
            value: item.field,
            label: item.name,
          }))}
          size='large'
        />
        <Button
          type='primary'
          className='startBtn'
          size='large'
          onClick={handleGridSizeChange}
        >
          START
        </Button>
        <div className='cellsContainer'>{renderRows()}</div>
      </section>
      <Notifications notifications={square.notifications} />
    </section>
  );
};

export default Square;
