import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GameGrid from '../../common/layout/GameGrid';
import socket from '../../common/socket';
import * as actions from '../actions';
import Board from './Board';

class Game extends React.Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    getWords: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    words: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getWords(this.props.game.id);
    socket.emit('join socket room', this.accessCode);
  }

  render() {
    const { player, words } = this.props;
    console.log(player);

    return <GameGrid boardComponent={<Board words={words} />} />;
  }
}

const mapStateToProps = state => ({
  game: state.menu.game,
  player: state.menu.player,
  words: state.game.words
});

export default connect(mapStateToProps, actions)(Game);
