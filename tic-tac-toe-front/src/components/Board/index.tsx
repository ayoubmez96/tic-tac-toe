import React from 'react'
import axios from 'axios'
import Square from '../Square/index'
import { BoardType } from '../../types/index'
import './index.css'

const DEFAULT_BOARD = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null
}

const Board: React.FC = () => {
  const [squares, setSquares] = React.useState<BoardType>(DEFAULT_BOARD)

  const calculateStatus = (winner: string | null) => {
    if (winner) return `Winner: ${winner}`
  }

  let restart = () => {
    setSquares(DEFAULT_BOARD)
  }

  let calculateWinner = (squares: BoardType) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[toKeyOfBoard(a)] && squares[toKeyOfBoard(a)] === squares[toKeyOfBoard(b)] && squares[toKeyOfBoard(a)] === squares[toKeyOfBoard(c)]) {
        return squares[toKeyOfBoard(a)]
      }
    }
    return null
  }

  let toKeyOfBoard = (index: number) => {
    return index as keyof BoardType
  }

  const winner = calculateWinner(squares)
  const status = calculateStatus(winner)

  let selectSquare = (square: keyof BoardType) => {
    // if there is a winner or square is occupied just return
    if (winner || squares[square]) {
      return
    }

    // make squares copy and record user move
    const squaresCopy = {...squares}
    squaresCopy[toKeyOfBoard(square)] = 'X'

    // pass squares with user move and return another copy with WOPR's best move and update state
    axios.post('http://localhost:8080/move', squaresCopy)
      .then(response => setSquares(response.data));
  }

  let squaresIn = (items: number[]) => {
    return (
      items.map(item => renderSquare(item))
    )
  }

  let renderSquare = (square: number) => {
    return (
      <Square squareNumber={toKeyOfBoard(square)} selectSquare={selectSquare} squares={squares} />
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {squaresIn([0, 1, 2])}
      </div>
      <div className="board-row">
        {squaresIn([3, 4, 5])}
      </div>
      <div className="board-row">
        {squaresIn([6, 7, 8])}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  );
}

export default Board;
