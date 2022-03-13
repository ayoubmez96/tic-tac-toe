import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

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

let squaresWithRobotMove = (squares: any) => {
  let bestMove = null
  const asArray = Object.entries(squares)
  const signs = ["X", "O"]
  const possibleMoves = asArray.filter(([key, value]) => value === null).map(value => value[0])
  // check if there is a winning move
  for (let i = 0; i < signs.length; i++) {
    possibleMoves.map(move => {
      let fakeSquares = { ...squares }
      fakeSquares[move] = signs[i]
      let hasWinner = calculateWinner(fakeSquares)
      if(signs.includes(hasWinner)) {
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
  squares[bestMove] = "O"
  return squares
}

let randomMove = (possibleMoves: any) => {
  return possibleMoves[Math.floor(Math.random()*possibleMoves.length)]
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
