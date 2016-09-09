import React from 'react'

class Content extends React.Component {

  render() {

    var content = []
    for (var i = 0; i < 10; i++){
      content.push((<p>Content</p>))
    }

    return (
      <div style={{width: '90%', margin: 'auto'}}>
        {content}
      </div>
    )
  }
}

export default Content
