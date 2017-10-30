import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import * as actions from '../actions';
import Board from './Board';


const socket = io();
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    border: '1px solid black',
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
    border: '1px solid black',
    flex: '1 100%',
    '@media screen and (min-width: 600px)': {
      flex: 3
    }
  },
  chat: {
    border: '1px solid black',
    flex: 1
  }
};

class Game extends React.Component {
  componentDidMount() {
    this.props.getWords(this.props.game.id);
    socket.emit('join socket room', this.accessCode);
  }

  render() {
    const { words } = this.props;

    return (
      <section style={styles.wrapper}>
        <header style={styles.header}>
          HEADER
        </header>
        <section style={styles.main}>
          <article style={styles.board}>
            BOARD
            <Board words={words} />
          </article>
          <aside style={styles.chat}>
            CHAT
          </aside>
        </section>
        <footer style={styles.footer}>
          FOOTER
        </footer>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.menu.game,
  player: state.menu.player,
  words: state.game.words
});

const GameContainer = connect(mapStateToProps, actions)(Game);

export { GameContainer as Game, Board };
