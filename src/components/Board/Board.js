import React from 'react';
import Square from '../Square/Square';
import './style.css';

class Board extends React.Component {

  state = {
    maxRowNumber: 3,
    maxSquaresNumber: 3
  }

  renderSquare(i, counter) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={counter}
      />
    );
  }
  
  renderRow(rowNumber) {
    const row = []; 
    let counter = 0;
    for (let j = rowNumber * 3; j < (rowNumber * 3 + this.state.maxSquaresNumber); j++ ){
      row.push(this.renderSquare(j, counter));
      counter += 1;
    }
    return row;
  }

  
  renderBoard = () => {
    const rows = [];
    let counterRows = 0;
    for (let i = 0; i < this.state.maxRowNumber; i++) {
      rows.push(
        <div className="board-row" key={counterRows++}>
          {
            this.renderRow(i)
          }
        </div>
      )
    }
    return rows;
  } 

  render() {
    return (
      <div className="board-container">
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;