import React from 'react'
import ReactDOM from 'react-dom'
import calculateWinner from "./winner-calculator";

function Square(props) {

    const onButtonClick = () => {
        props.onClick();
    };

    return (
        <button className="square"
                onClick={onButtonClick}
                >
            {props.value}
        </button>
    );

}

function Board(props){

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         squares : Array(9).fill(null),
    //         xIsNext: true
    //     }
    // }

    const renderSquare = (i) => {
        return <Square value={props.squares[i]} onClick={()=>props.handleClick(i)} />;
    };



        return (
            <div>
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
        );


}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history:[{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    jumpTo(step){
        this.setState({
           stepNumber: step,
           xIsNext: (step % 2) === 0,
        });
    }

    updateHistory = (i) => {
        // console.log(i);
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: [...history,{squares: squares}],
            stepNumber:history.length,
            xIsNext: !this.state.xIsNext});
    };
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
           const desc = move? 'Go to move #'+move:'Go to game start';
           return (
               <li key={move}> <button onClick={()=>this.jumpTo(move)}>{desc}</button></li>
           );
        });

        let status;
        if(winner){
            status = 'Winner:' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} xIsNext={this.state.xIsNext} handleClick={this.updateHistory}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
