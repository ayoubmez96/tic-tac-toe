import React from 'react'

type Board = {
  0: string | null,
  1: string | null,
  2: string | null,
  3: string | null,
  4: string | null,
  5: string | null,
  6: string | null,
  7: string | null,
  8: string | null
}

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
  const [squares, setSquares] = React.useState<Board>(DEFAULT_BOARD)

  const calculateStatus = (winner: string | null) => {
    if (winner) return `Winner: ${winner}`
  }

  let restart = () => {
    setSquares(DEFAULT_BOARD)
  }

  let calculateWinner = (squares: any) => {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const winner = calculateWinner(squares)
  const status = calculateStatus(winner)

  let selectSquare = (square: keyof Board) => {
      // if there is a winner or square is occupied just return

      if (winner || squares[square]) {
        return
      }

      // make squares copy and record user move
      const squaresCopy = {...squares}
      squaresCopy[square] = 'X'

      // pass squares with user move and return another copy with WOPR's best move and update state
      // axios.post('http://localhost:8080/move', squaresCopy)
      //   .then(response => setSquares(response.data));
    }

  return (
    <div>
      <div>
        yo this is the board
      </div>
    </div>
  );
}

export default Board;
