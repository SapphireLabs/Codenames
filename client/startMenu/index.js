import React from 'react';

import wordList from '../public/wordList.json';
import { getRandItems } from '../utils/board';

export default class StartMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    }
  }

  componentWillMount() {
    this.setState({ words: getRandItems(wordList.words, 25) });
  }

  render() {
    return (
      <div>
        <div>Codenames start menu</div>
        {this.state.words.map((word, i) => <p key={i}>{word}</p>)}
      </div>
    );
  }
}
