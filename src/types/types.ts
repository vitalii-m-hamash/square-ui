export interface CellProps {
  row: number;
  col: number;
  initialColor: string;
  setHoveredCell: React.Dispatch<
    React.SetStateAction<{ row: number; col: number } | null>
  >;
}

export interface RowProps {
  row: number;
  numCols: number;
  initialColor: string;
  setHoveredCell: React.Dispatch<
    React.SetStateAction<{ row: number; col: number } | null>
  >;
}
