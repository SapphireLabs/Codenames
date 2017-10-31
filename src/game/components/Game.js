import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import socket from '../../common/socket';
import * as actions from '../actions';
import Board from './Board';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    border: '1px solid black'
  },
  header: {
    border: '1px solid black',
    flex: 1
  },
  footer: {
    border: '1px solid black',
    flex: 1
  },
  main: {
    display: 'flex',
    flexFlow: 'row wrap',
    flex: 4
  },
  board: {
    border: '1px solid black'
  },
  chat: {
    border: '1px solid black',
    flex: 1
  }
};

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

    return (
      <section style={styles.wrapper}>
        <header style={styles.header}>HEADER</header>
        <section style={styles.main}>
          <article style={styles.board}>
            BOARD
            <Board words={words} />
          </article>
          <aside style={styles.chat}>
            {player.name}
            CHAT
          </aside>
        </section>
        <footer style={styles.footer}>FOOTER</footer>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  game: state.menu.game,
  player: state.menu.player,
  words: state.game.words
});

export default connect(mapStateToProps, actions)(Game);
