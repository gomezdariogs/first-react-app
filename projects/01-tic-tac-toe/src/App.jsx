import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { Board } from "./components/Board"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  }
  )

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X //si es null o undefined el de la izquierda, usa el de la derecha, || se fija si es false
  }
  )

  const [winner, setWinner] = useState(null) //null es que no hay ganador, false es que hay empate

  const updateBoard = (index) => {
    //no actualizo posicion si ya tiene algo o si hay un ganador
    if (board[index] || winner) return
    //actualizar el tablero
    const newBoard = [...board] //copia superficial del array para que los datos del nuevo renderizado sean nuevos
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //reviso si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  useEffect(() => {
    //como minimo se ejecuta una vez. Ejecuta codigo arbitrario cada vez que cambie el segundo parametro
    console.log('useEffect')
  }, [turn, board])

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className="game">
        <Board board={board} updateBoard={updateBoard} />
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
