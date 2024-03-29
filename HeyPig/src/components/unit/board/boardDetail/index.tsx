import React from 'react';
import {Board2Detail} from '../Detail/Board2Detail';
import {BoardDetailContainer} from '../Detail/Board1Detail/BoardDetail.container';

export function BoardDetail({navigation, route}: any) {
  if (route.params.boardId) {
    return (
      <Board2Detail boardId={route.params.boardId} navigation={navigation} />
    );
  }
  return <BoardDetailContainer navigation={navigation} route={route} />;
}
