const palet = ["blue","red"];

// notice properties takeTurn and id are being passed in
const Square = ({ id, newState }) => {
  // id is the square's number
  // We call takeTurn to tell Parent we have clicked in this square

  const [color, setColor] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [tick, setTick] = React.useState(false);
  const xo = ["O", "X"];

  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => {
      console.log(`Unmounting Square ${id}`);
    }
  });

  return (
    <button
      onClick={(e) => {
        if (!tick) {
          let nextPlayer = newState(id);
          let col = palet[nextPlayer];
          setColor(col);
          setStatus(nextPlayer);
          setTick(true);
          e.target.style.background = col;
        }
      }}
    >
      <h1>{xo[status]}</h1>
    </button>
  );
};

const Board = () => {
  // 1st player is 1
  // State keeps track of next player
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));
  const [color, setColor] = React.useState(palet[1]); 
  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if (winner != null) status = `Player ${winner} wins`;

  const newState = idOfSquare => {
    let currentPlayer = player;
    state[idOfSquare] = player;
    setState(state);
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    setColor(palet[next]);
    return currentPlayer;
  };

  function renderSquare(i) {
    // use properties to pass callback function takeTurn to Child
    return <Square id={i} newState={newState}></Square>;
  }

  const newGame = () => {
    let newGame = confirm("Do you really want to start new game?");
    if (!newGame) return;
    setPlayer(1);
    setState(Array(9).fill(null));
  }
  return (
    <>
      <button onClick={newGame}>New Game</button>
      <div className="game-board">
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div id="info">
          <h1 className={color}>{status}</h1>
        </div>
      </div>
    </>
  );
};

function checkWinner(state) {

  const win = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (state[a] == state[b] && state[a] == state[c] && state[b] == state[c])
      return state[a];
  }

  return null;
}

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
