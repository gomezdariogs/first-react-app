import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
    //reviso combinaciones ganadores para ver si gana X u O
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //si no hay ganador
    return null
  }

export const checkEndGame = (newBoard) => {
    //reviso si hay empate si no hay mas espacios vacios en el tablero
    return newBoard.every((square) => square != null)
  }