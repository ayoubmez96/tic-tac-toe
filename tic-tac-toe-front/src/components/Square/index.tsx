import React from 'react';
import { BoardType } from '../../types/index'

interface Props {
  squares: BoardType
  squareNumber: keyof BoardType
  selectSquare: (square: keyof BoardType) => void
}

const Square: React.FC<Props> = ({ squares, squareNumber, selectSquare }) => {
  return (
    <button onClick={() => selectSquare(squareNumber)}>
      {squares[squareNumber]}
    </button>
  );
}

export default Square;
