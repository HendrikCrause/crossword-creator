export const APP_NAME = 'Crossword Creator'

export const ACTION = {
  ADD_WORD: 'ADD_WORD',
  REMOVE_WORD: 'REMOVE_WORD',
  UPDATE_WORD: 'UPDATE_WORD'
}

export const ORIENTATION = {
    VERTICAL: 'Vertical',
  HORIZONTAL: 'Horizontal'
}

export const BLOCK_SIZE = 40

export const BLACK_CELL_PLACEHOLDER = '#'

export const DIRECTION = {
     UP: { row: -1, col:  0 },
   DOWN: { row:  1, col:  0 },
   LEFT: { row:  0, col: -1 },
  RIGHT: { row:  0, col:  1 }
}
