import React from 'react';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';

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
  render() {
    const { words } = this.props;

    return (
      <div style={styles.root}>
        { words
          ? <GridList
              cols={5}
              spacing={2}
              cellHeight="auto"
              style={styles.gridList}
            >
              {words.map(word =>
                <GridListTile key={word.position}>
                  <GridListTileBar
                    title={word.word}
                    subtitle={<span>TODO: votes</span>}
                    actionIcon={
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              )}
            </GridList>
          : null
        }
      </div>
    );
  }
}
