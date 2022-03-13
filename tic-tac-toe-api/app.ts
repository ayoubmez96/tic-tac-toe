import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

type BoardType = {
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

const app = express();
const port = 8080;
app.use(cors({origin: "http://localhost:3000"}))

// Middleware
app.use(express.json())

app.listen(port, () => {
  console.log(`application is running on port ${port}.`);
});

app.post('/move', (req: Request, res: Response, next: NextFunction) => {
    const squares = req.body
    const squaresClone = squaresWithRobotMove(squares)
    res.status(200).json(squaresClone)
})

let toKeyOfBoard = (index: number) => {
  // change type of square index from number to keyof BoardType
  // typescript throws an error if we let do something like that squares[number]
  return index as keyof BoardType
}

let squaresWithRobotMove = (squares: BoardType) => {
  let bestMove = null
  const asArray = Object.entries(squares)
  const signs = ["X", "O"]
  const possibleMoves = asArray.filter(([key, value]) => value === null).map(value => parseInt(value[0]))
  // check if there is a winning move
  for (let i = 0; i < signs.length; i++) {
    possibleMoves.map(move => {
      let fakeSquares = { ...squares }
      fakeSquares[toKeyOfBoard(move)] = signs[i]
      let hasWinner = calculateWinner(fakeSquares)
      if(hasWinner && signs.includes(hasWinner)) {
        bestMove = move
      }
    })
  }

  if(!bestMove) {
    // 4 is the center square
    if (squares[4] == null) {
      bestMove = 4
    } else {
      bestMove = randomMove(possibleMoves)
    }
  }
  squares[toKeyOfBoard(bestMove)] = "O"
  return squares
}

let randomMove = (possibleMoves: number[]) => {
  return possibleMoves[Math.floor(Math.random()*possibleMoves.length)]
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
