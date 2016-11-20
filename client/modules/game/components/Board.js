import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';


export default class Board extends React.PureComponent {
  componentDidMount() {
  }

  render() {
    return (
      <GridList
        cols={5}
        padding={2}
      >
      </GridList>
    );
  }
}
