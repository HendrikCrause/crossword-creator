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
