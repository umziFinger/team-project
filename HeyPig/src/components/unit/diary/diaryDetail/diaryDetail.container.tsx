import * as React from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import DiaryDetailUI from './diaryDetail.presenter';


export function DiaryDetail({navigation, route}:any) {

    function onClickEdit() {
        navigation.navigate('DiaryWrite', {route})
    }

    const user = auth().currentUser

    async function onClickDelete() {

        await firestore()
            .collection('Users')
            .doc(String(user?.email))
            .collection("Diary")
            .doc(`${route.params.el.date}day`)
            .delete()
        navigation.navigate('DiaryMain')
    }

    return(
        <DiaryDetailUI
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            route={route}
        />
    )
}