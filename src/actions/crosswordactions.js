import dispatcher from '../dispatcher/dispatcher'
import { ACTION } from '../constants'

export function addWord(word={word: '', clue: ''}) {
  dispatcher.dispatch({
    type: ACTION.ADD_WORD,
    word
  })
}

export function removeWord(number) {
  dispatcher.dispatch({
    type: ACTION.REMOVE_WORD,
    number
  })
}

export function updateWord(number, word) {
  dispatcher.dispatch({
    type: ACTION.UPDATE_WORD,
    word,
    number
  })
}

export function enterCharacter(cell, value) {
  dispatcher.dispatch({
    type: ACTION.ENTER_CHARACTER,
    cell,
    value
  })
}

export function generateCrossword() {
  dispatcher.dispatch({
    type: ACTION.GENERATE_CROSSWORD
  })
}

export function updateName(name) {
  dispatcher.dispatch({
    type: ACTION.UPDATE_NAME,
    name
  })
}

export function updateDescription(description) {
  dispatcher.dispatch({
    type: ACTION.UPDATE_DESCRIPTION,
    description
  })
}
