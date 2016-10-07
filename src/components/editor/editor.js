import React from 'react'
import { Table, TableBody, TableHeader } from 'material-ui/Table'

import Row from './row'
import ButtonRow from './buttonrow'
import HeaderRow from './headerrow'
import { narrowStyle, wordStyle, colStyle, actionsStyle } from './styles'

import crosswordStore from '../../store/crosswordstore'

const MIN_ROWS = 5

class Editor extends React.Component {

  constructor(props) {
    super(props)

    let wordList = this.props.words || []
    if(wordList.length < MIN_ROWS) {
      Array.from(Array(MIN_ROWS - wordList.length))
        .forEach((e) => {
          wordList.push({
            word: '',
            clue: ''
          })
        })
    }

    this.state = {
      words: crosswordStore.getAllWords()
    }
  }

  componentWillMount() {
    crosswordStore.on('change', () => {
      this.setState({
        words: crosswordStore.getAllWords()
      })
    })
  }

  addWord(){
    let wordList = this.state.words
    wordList.push({
      word: '',
      clue: ''
    })
    this.setState({
      words: wordList
    })
  }

  removeWord(index) {
    let wordList = this.state.words
    wordList.splice(index, 1)
    this.setState({
      words: wordList
    })
  }

  updateWord(index, word) {
    let wordList = this.state.words
    wordList[index] = word
    this.setState({
      words: wordList
    })
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
