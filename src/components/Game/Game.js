import React from 'react';
import Board from '../Board/Board';
import RevertHistoryOrder from '../RevertHistoryOrder/index.js'
import './style.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          row: null,
          column: null,
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      squareNumber: null,
      historyOrder: 'descending',
    };
  }

  getColumn(i) {
    const column = i % 3 + 1;

    return column;
  }

  getRow(i) {
    const row = ~~(i / 3) + 1;

    return row;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          row: this.getRow(i),
          column: this.getColumn(i),
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      squareNumber: i,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  revertOrder () {
    const history = this.state.history.slice();
    return history.reverse();
  }
    // if (this.state.historyOrder === "descending") {
    //   this.setState({ historyOrder: "ascending" });
    // } else {
    //   this.setState({ historyOrder: "descending" });
    //   history.reverse();
    // }
      // const history = this.state.history.slice();
      // // const historyOrder = this.state.historyOrder;
      // this.state.historyOrder === "descending" ? this.setState({ historyOrder: "ascending" }) : this.setState({ historyOrder: "descending" });
      // if (historyOrder === 'ascending') {
      //   this.setState({
      //     history: history.reverse()
      //   });
      // }
      // history.reverse();
    // }

    // return history;
  // }  

  render() {
    const history = this.state.history;
    // if (this.state.historyOrder === "descending") {
    //   this.setState({ historyOrder: "ascending" });
    //   history.reverse();
    // } else {
    //   this.setState({ historyOrder: "descending" });
    //   history.reverse();
    // }
    // this.state.historyOrder === "descending" ? this.setState({ historyOrder: "ascending" }): this.setState({ historyOrder: "descending" });

    // const historyOrder = this.state.historyOrder;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // if (historyOrder === 'ascending') {
    //   this.setState({
    //     history: history.reverse()
    //   });
    // }

    const moves = history.map((step, move) => {
      const classNames = ["move", move === this.state.stepNumber ? 'bolded' : ''].join(' ').trim();
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      
      return (
        <li key={move}  className = {classNames} >
          <button onClick={() => this.jumpTo(move)}>{desc} row: { step.row ?  step.row : 0 }, column: { step.column ? step.column : 0 }</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <RevertHistoryOrder 
          onClick={ this.revertOrder() } 
        />
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default Game;