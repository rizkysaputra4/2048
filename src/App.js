import { useState, useEffect } from "react";

const BOARD_SIZE = 5;
const boardInit = Array.from(Array(BOARD_SIZE), () =>
  new Array(BOARD_SIZE).fill(0)
);

function App() {
  const [board, setBoard] = useState(boardInit);
  const [score, setSore] = useState(0);

  useEffect(() => {
    setSore(countScore(board));
  }, [board]);

  return (
    <div className="App">
      <h4 style={{ textAlign: "center" }} className="mt-3">
        Score: {score}
      </h4>
      <Board board={board} />
      <Buttons board={board} setBoard={setBoard} />
    </div>
  );
}

function countScore(board) {
  let score = 0;
  board.forEach((row) => {
    row.forEach((cell) => {
      score += cell;
    });
  });

  return score;
}

function Board(props) {
  let board = props.board;
  return (
    <div className="board">
      {board.map((row, index) => {
        return (
          <div className="row" key={index}>
            {row.map((cell, cellIndex) => {
              return (
                <div className="column" key={cellIndex}>
                  <p>{cell ? cell : ""}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function Buttons(props) {
  const buttons = Array.from(Array(3), () => new Array(3).fill(0));

  buttons[0][1] = "Up";
  buttons[1][0] = "Left";
  buttons[1][2] = "Right";
  buttons[2][1] = "Down";

  const onClickLeft = () => {
    props.setBoard([...handleClickLeft(props.board)]);
  };
  const onClickUp = () => {
    props.setBoard([...handleClickUp(props.board)]);
  };
  const onClickRight = () => {
    props.setBoard([...handleClickRight(props.board)]);
  };
  const onClicDown = () => {
    props.setBoard([...handleClickDown(props.board)]);
  };

  const onClickHandler = {
    Up: onClickUp,
    Left: onClickLeft,
    Right: onClickRight,
    Down: onClicDown,
  };

  return (
    <div className="buttonContainer">
      {buttons.map((col, colIndex) => {
        return (
          <div className="buttonRow" key={colIndex}>
            {col.map((cell, index) => {
              const mid = colIndex === 1 && index % 2 === 0;
              const upDown = colIndex % 2 === 0 && index === 1;
              if (upDown || mid) {
                return (
                  <div className="button buttonColumn" key={cell}>
                    <button
                      type="button"
                      className={(cell, "btn btn-primary")}
                      onClick={() => onClickHandler[cell]()}
                    >
                      {cell}
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="notButton buttonColumn" key={index}></div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

function handleClickLeft(board, setBoard) {
  let newBoard = [];

  for (let i = 0; i < board.length; i++) {
    let newRow = [];
    let currentValue = 0;
    for (let j = 0; j < board[i].length; j++) {
      if (currentValue > 0 && currentValue === board[i][j]) {
        newRow.push(board[i][j] + currentValue);
        currentValue = 0;
      } else if (currentValue !== board[i][j] && board[i][j] !== 0) {
        if (currentValue !== 0) {
          newRow.push(currentValue);
        }
        currentValue = board[i][j];
      } else if (currentValue === 0 && board[i][j] > 0) {
        currentValue = board[i][j];
      } else if (j === board[i].length - 1 && currentValue !== 0) {
        newRow.push(currentValue);
        currentValue = 0;
      }
      if (board[i][j] !== 0 && j === board[j].length - 1) {
        newRow.push(board[i][j]);
      }
    }

    let stillZero = new Array(board.length - newRow.length).fill(0);
    newBoard.push(newRow.concat(stillZero));
  }
  return assignValueInRandomCell(newBoard);
}

function handleClickRight(board, setBoard) {
  let newBoard = [];

  for (let i = 0; i < board.length; i++) {
    let newRow = [];
    let currentValue = 0;
    for (let j = board[i].length - 1; j >= 0; j--) {
      if (currentValue > 0 && currentValue === board[i][j]) {
        newRow.push(board[i][j] + currentValue);
        currentValue = 0;
      } else if (currentValue !== board[i][j] && board[i][j] !== 0) {
        if (currentValue !== 0) {
          newRow.push(currentValue);
        }
        currentValue = board[i][j];
      } else if (currentValue === 0 && board[i][j] > 0) {
        currentValue = board[i][j];
      } else if (j === 0 && currentValue !== 0) {
        newRow.push(currentValue);
        currentValue = 0;
      }
      if (board[i][j] !== 0 && j === 0) {
        newRow.push(board[i][j]);
      }
    }

    let stillZero = new Array(board.length - newRow.length).fill(0);
    newRow.reverse();
    newBoard.push(stillZero.concat(newRow));
  }
  return assignValueInRandomCell(newBoard);
}

function handleClickUp(board, setBoard) {
  let newBoard = [];

  for (let j = 0; j < board.length; j++) {
    let newRow = [];
    let currentValue = 0;
    for (let i = 0; i < board.length; i++) {
      if (currentValue > 0 && currentValue === board[i][j]) {
        newRow.push(board[i][j] + currentValue);
        currentValue = 0;
      } else if (currentValue !== board[i][j] && board[i][j] !== 0) {
        if (currentValue !== 0) {
          newRow.push(currentValue);
        }
        currentValue = board[i][j];
      } else if (currentValue === 0 && board[i][j] > 0) {
        currentValue = board[i][j];
      } else if (i === board.length - 1 && currentValue !== 0) {
        newRow.push(currentValue);
        currentValue = 0;
      }
      if (board[i][j] !== 0 && i === board.length - 1) {
        newRow.push(board[i][j]);
      }
    }

    let stillZero = new Array(board.length - newRow.length).fill(0);

    newBoard.push(newRow.concat(stillZero));
  }

  return assignValueInRandomCell(transpose(newBoard));
}

function handleClickDown(board, setBoard) {
  let newBoard = [];

  for (let j = 0; j < board.length; j++) {
    let newRow = [];
    let currentValue = 0;
    for (let i = board.length - 1; i >= 0; i--) {
      if (currentValue > 0 && currentValue === board[i][j]) {
        newRow.push(board[i][j] + currentValue);
        currentValue = 0;
      } else if (currentValue !== board[i][j] && board[i][j] !== 0) {
        if (currentValue !== 0) {
          newRow.push(currentValue);
        }
        currentValue = board[i][j];
      } else if (currentValue === 0 && board[i][j] > 0) {
        currentValue = board[i][j];
      } else if (i === 0 && currentValue !== 0) {
        newRow.push(currentValue);
        currentValue = 0;
      }
      if (board[i][j] !== 0 && i === 0) {
        newRow.push(board[i][j]);
      }
    }

    let stillZero = new Array(board.length - newRow.length).fill(0);
    newRow.reverse();
    newBoard.push(stillZero.concat(newRow));
  }

  return assignValueInRandomCell(transpose(newBoard));
}

function assignValueInRandomCell(board) {
  let emptyCell = scanEmptyCell(board);
  let coordinate = emptyCell[generateRandomNumber(0, emptyCell.length - 1)];
  if (!coordinate) {
    return board;
  }

  board[coordinate[0]][coordinate[1]] = 2;

  return board;
}

function scanEmptyCell(board) {
  let res = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) {
        res.push([i, j]);
      }
    }
  }

  return res;
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default App;
