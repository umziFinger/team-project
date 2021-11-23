import * as React from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DiaryWriteUI from './diaryWrite.presenter';

export function DiaryWrite({navigation, route}:any) {

    const [date, setDate] = React.useState(0)

    const [title, setTitle] = React.useState('')
    const [weight, setWeight] = React.useState('')
    const [food, setFood] = React.useState('')
    const [exercise, setExercise] = React.useState('')
    const [image, setImage] = React.useState('')

    const user:any = auth().currentUser
    const email = user?.email

    const signinDate:any = new Date(user?.metadata.creationTime.slice(0,10))
    const currentDate:any = new Date(new Date().toISOString().slice(0,10))
  
    React.useEffect(() => {
      setDate((currentDate-signinDate)/(3600000*24))
    },[])

    const addCameraImage = () => {

        const options:any = {
            takePhotoButtonTitle: '카메라',
            chooseFromLibraryButtonTitle: '이미지 선택',
            cancelButtonTitle: '취소'
        };

        launchCamera(options, (response:any) => {
            console.log(response)
            if(response.didCancel){
                console.log("취소됨")
            }else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }else{
                setImage(response.assets[0].uri)
            }
        })
        setModalVisible(!modalVisible)
    }

    const addGalleryImage = () => {

        const options:any = {
            takePhotoButtonTitle: '카메라',
            chooseFromLibraryButtonTitle: '이미지 선택',
            cancelButtonTitle: '취소'
        };

        launchImageLibrary(options, (response:any) => {
            console.log(response)
            if(response.didCancel){
                console.log("취소됨")
            }else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }else{
                setImage(response.assets[0].uri)
            }
        })
        setModalVisible(!modalVisible)
    }

    async function writeDiary() {
        {email === null 
          ?
            firestore()
              .collection('Users')
              .doc(String(user?.uid))
              .collection("Diary")
              .doc(`${String(date+1)}day`)
              .set({ title, weight, food, exercise, createdAt: new Date().toISOString(), date:date+1, image })
          :
            firestore()
              .collection('Users')
              .doc(String(user?.email))
              .collection("Diary")
              .doc(`${String(date+1)}day`)
              .set({ title, weight, food, exercise, createdAt: new Date().toISOString(), date:date+1, image })
        }
        navigation.navigate('DiaryMain')
    }

    const [modalVisible, setModalVisible] = React.useState(false);
    return(
        <DiaryWriteUI
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            addCameraImage={addCameraImage}
            addGalleryImage={addGalleryImage}
            writeDiary={writeDiary}
            setTitle={setTitle}
            setFood={setFood}
            setWeight={setWeight}
            setExercise={setExercise}
            date={date}
            route={route}
            image={image}
        />
    )

}