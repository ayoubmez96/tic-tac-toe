import React from 'react';
import Board from '../Board/index'

const Game: React.FC = () => {
  return (
    <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
  );
}

export default Game;
