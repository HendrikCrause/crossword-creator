import React from 'react'
import { Table, TableBody, TableHeader } from 'material-ui/Table'

import Row from './row'
import ButtonRow from './buttonrow'
import HeaderRow from './headerrow'
import { narrowStyle, wordStyle, colStyle, actionsStyle } from './styles'

import crosswordStore from '../../store/crosswordstore'
import * as Actions from '../../actions/crosswordactions'

const MIN_ROWS = 5

class Editor extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      words: crosswordStore.getAllWords()
    }
    this.resetWords = this.resetWords.bind(this)
  }

  resetWords() {
    this.setState({
      words: crosswordStore.getAllWords()
    })
  }

  componentWillMount() {
    crosswordStore.on('change', this.resetWords)
  }

  componentWillUnmount() {
    crosswordStore.removeListener('change', this.resetWords)
  }

  addWord() {
    Actions.addWord()
  }

  removeWord(number) {
    Actions.removeWord(number)
  }

  updateWord(word) {
    Actions.updateWord(word)
    // let wordList = this.state.words
    // wordList[number] = word
    // this.setState({
    //   words: wordList
    // })
  }

  render() {
    return (
      <Table selectable={false}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <HeaderRow/>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.state.words.map((w) => {
              return (
                <Row
                  key={w.number}
                  number={w.number}
                  word={w.word}
                  clue={w.clue}
                  handleRemoveWord={this.removeWord.bind(this)}
                  handleUpdateWord={this.updateWord.bind(this)}
                />
              )
            })
          }
          <ButtonRow
            handleAddWord={this.addWord.bind(this)}
          />
        </TableBody>
      </Table>
    )
  }
}

export default Editor
