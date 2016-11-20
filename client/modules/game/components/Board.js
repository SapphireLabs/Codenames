import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';


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
