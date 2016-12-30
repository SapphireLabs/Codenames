import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '80%',
    height: '80%',
    maxWidth: '500px',
    maxHeight: '500px',
  },
};

export default class Board extends React.PureComponent {
  componentDidMount() {
  }

  render() {
    const { words } = this.props;

    return (
      <div style={styles.root}>
        { words
          ? <GridList
            cols={5}
            padding={2}
            cellHeight="auto"
            style={styles.gridList}
          >
            {words.map(word =>
              <GridTile
                key={word.position}
                title={word.word}
              />
            )}
          </GridList>
          : null
        }
      </div>
    );
  }
}
