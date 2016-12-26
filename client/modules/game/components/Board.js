import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  gridList: {
    width: '100%',
    height: '100%'
  }
};

export default class Board extends React.PureComponent {
  componentDidMount() {
  }

  render() {
    const { words } = this.props;

    return (
      <div>
        { words
          ? <GridList
            cols={5}
            padding={2}
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
