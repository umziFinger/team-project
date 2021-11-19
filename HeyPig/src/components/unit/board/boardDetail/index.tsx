import React from 'react';
<<<<<<< HEAD
import {Board2Detail} from '../Detail/Board2Detail';
import {BoardDetailContainer} from '../Detail/Board1Detail/BoardDetail.container';
=======
import {Board2Detail} from '../Board2Detail/Board2';
import {BoardDetailContainer} from '../Detail/BoardDetail.container';
>>>>>>> c12cd21 (rebase)

export function BoardDetail({navigation, route}: any) {
  if (route.params.boardId) {
    return (
      <Board2Detail boardId={route.params.boardId} navigation={navigation} />
    );
  }
  return <BoardDetailContainer navigation={navigation} route={route} />;
}
