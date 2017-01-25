export const APP_NAME = 'Crossword Creator'

export const ACTION = {
  ADD_WORD: 'ADD_WORD',
  REMOVE_WORD: 'REMOVE_WORD',
  UPDATE_WORD: 'UPDATE_WORD',
  ENTER_CHARACTER: 'ENTER_CHARACTER',
  GENERATE_CROSSWORD: 'GENERATE_CROSSWORD',
  UPDATE_NAME: 'UPDATE_NAME',
  UPDATE_DESCRIPTION: 'UPDATE_DESCRIPTION',
  CLEAR_WORDS: 'CLEAR_WORDS',
  UPDATE_CHECK: 'UPDATE_CHECK',
}

export const ORIENTATION = {
    VERTICAL: 'Vertical',
  HORIZONTAL: 'Horizontal',
    OPPOSITE: function(o) {
      if(o === this.VERTICAL) return this.HORIZONTAL
      if(o === this.HORIZONTAL) return this.VERTICAL
      return o
    }
}

export const BLOCK_SIZE = 50
export const MARGIN_SIZE = 20
export const CONTAINER_WIDTH_PERC = 90

export const BLACK_CELL_PLACEHOLDER = '#'

export const DIRECTION = {
     UP: { row: -1, col:  0 },
   DOWN: { row:  1, col:  0 },
   LEFT: { row:  0, col: -1 },
  RIGHT: { row:  0, col:  1 }
}

export const MAX_HEIGHT = 15
export const MAX_WIDTH = 15

export const MAX_ORPHAN_WORDS = 0
export const MAX_BLACK_SQUARE_PERCENTAGE = 65
