import * as React from 'react';
import { GlobalContext } from '~/App';
import DiaryMainUI from './diaryMain.presenter';

export function DiaryMain({navigation}: any) {

    const {diary, user}:any = React.useContext(GlobalContext)
  
    const email = user?.email
  
    return (
      <DiaryMainUI
        diary={diary}
        user={user}
        navigation={navigation}
      />
    );
  }
  