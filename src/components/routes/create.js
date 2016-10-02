import React from 'react'
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import TextField from 'material-ui/TextField'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentClear from 'material-ui/svg-icons/content/clear'

const MIN_ROWS = 7

const colStyle = {
  fontSize: 14
}

const narrowStyle = {
  fontSize: 14,
  width: 50
}

const wordStyle = {
  fontSize: 14,
  width: 100
}

const actionsStyle = {
  fontSize: 14,
  paddingRight: 0,
  width: 100
}

class Row extends React.Component {

  remove() {
    this.props.handleRemoveWord(this.props.number)
  }

  updateWord(event) {
    this.props.handleUpdateWord(this.props.number, {
      word: event.target.value,
      clue: this.props.clue
    })
  }

  updateClue(event) {
    this.props.handleUpdateWord(this.props.number, {
      word: this.props.word,
      clue: event.target.value
    })
  }

  render() {
    return (
      <TableRow>
        <TableRowColumn style={narrowStyle}>{this.props.number + 1}</TableRowColumn>
        <TableRowColumn style={wordStyle}>
          <TextField
            value={this.props.word}
            name={'word_' + this.props.number}
            onChange={this.updateWord.bind(this)}
          />
        </TableRowColumn>
        <TableRowColumn style={colStyle}>
          <TextField
            fullWidth={true}
            multiLine={true}
            rows={1}
            value={this.props.clue}
            name={'clue_' + this.props.number }
            onChange={this.updateClue.bind(this)}
          />
        </TableRowColumn>
        <TableRowColumn style={wordStyle}>
          <FlatButton
            label="Remove"
            icon={
              <ContentClear />
            }
            labelPosition='before'
            labelStyle={{
              fontSize: 12
            }}
            onClick={this.remove.bind(this)}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
}

class Create extends React.Component {

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
      words: wordList
    }
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
          <TableRow>
            <TableHeaderColumn style={narrowStyle}>ID</TableHeaderColumn>
            <TableHeaderColumn style={wordStyle}>Word</TableHeaderColumn>
            <TableHeaderColumn style={colStyle}>Clue</TableHeaderColumn>
            <TableHeaderColumn style={actionsStyle}>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.state.words.map((w, i) => {
              return (
                <Row
                  key={i}
                  number={i}
                  word={w.word}
                  clue={w.clue}
                  handleRemoveWord={this.removeWord.bind(this)}
                  handleUpdateWord={this.updateWord.bind(this)}
                />
              )
            })
          }
          <TableRow>
            <TableRowColumn style={narrowStyle}></TableRowColumn>
            <TableRowColumn>
              <RaisedButton
                label="Add"
                primary={true}
                icon={
                  <ContentAdd />
                }
                labelPosition='before'
                onClick={this.addWord.bind(this)}
              />
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default Create
