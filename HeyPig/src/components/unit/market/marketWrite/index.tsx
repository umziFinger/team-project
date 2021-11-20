import { useMutation } from '@apollo/client';
import * as React from 'react';
import { Image,Text, View, TextInput, StyleSheet, Button, ScrollView, Pressable, Modal,TouchableOpacity} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {CREATE_USED_ITEM} from '~/components/commons/market.queries';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const styles = StyleSheet.create({
    Inputbox: {
        height: 50,
        width: 380,
        backgroundColor:'white',
        margin:10,
    },
    InputContents:{
        height: 250,
        width :380,
        backgroundColor:"white",
        margin:10
    },
    ButtonStyle: {
        position: 'absolute',
        backgroundColor: '#58ccff',
        right: 30,
        bottom: 30,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
      },
      ImageAddtion:{
          height: 150,
          width: 150,
          backgroundColor:"gray",
          justifyContent:'center',
          alignItems:'center',
          margin: 20
      },
    button: {
        marginTop: 10,
        marginLeft: 170,
        width: 50,
        padding: 5,
    },
      
    buttonClose: {
        // backgroundColor: "#2196F3",
        },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
        },

    modalView: {
        width: 250,
        height: 160,
        backgroundColor: "white",
        padding: 20,
        elevation: 5,
        borderRadius: 5,
     },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold'
       },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center"
        },
})

export function MarketWrite({navigation,route}:any) {
    const [selectedLanguage, setSelectedLanguage] = React.useState("");
    const [modalVisible, setModalVisible] = React.useState(false);
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
    const user:any = auth().currentUser;
    const writer = user?.email;
    const [productName, setProductName] = React.useState("")
    const [price,setPrice] =React.useState("")
    const [contents,setContents] = React.useState("")
    const [treadArea, setTreadArea] = React.useState("")
    const [image, setImage] = React.useState("")
    

    async function onClickWriteProduct(){
        if (price !=='' && contents !=='' && treadArea !=='' && productName !=='') {
            firestore()
            .collection('Market')
            .add({writer,productName,price,contents,treadArea})
            navigation.navigate('MarketMain');
        }
    }
    async function onClickUpdateImage() {

    }
    return(
    <View >
        <ScrollView>
            <Modal
                    // animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>사진</Text>
                        <TouchableOpacity style={{marginTop: 7}} onPress={addCameraImage}>
                            <Text>카메라</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop: 5}} onPress={addGalleryImage}>
                            <Text>이미지 선택</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>취소</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
            {/* <Text style={{marginLeft:10}} >판매자</Text>
            <TextInput
                style={styles.Inputbox}
                onChangeText={text=>setName(text)}
                defaultValue={route.params?.route.params.el.name}
            /> */}
            <Text style={{marginLeft:10}}>상품명</Text>
            <TextInput
                style={styles.Inputbox}
                onChangeText={text=>setProductName(text)}
                defaultValue={route.params?.route.params.el.productName}
                />
            <Text style={{marginLeft:10}}>가격</Text>
            <TextInput 
                style={styles.Inputbox} 
                onChangeText={text=>setPrice(text)}
                defaultValue={route.params?.route.params.el.price}
                />
            <Text style={{marginLeft:10}}>내용</Text>
            <TextInput 
                style={styles.InputContents}
                onChangeText={text=>setContents(text)}
                defaultValue={route.params?.route.params.el.contents}
                />
            <Text style={{marginLeft:10}}>거래가능지역</Text>
            <TextInput
                style={styles.Inputbox}
                onChangeText={text=>setTreadArea(text)}
                defaultValue={route.params?.route.params.el.treadArea}
                />
            <Text style={{marginLeft:10}}>사진</Text>
            <Pressable onPress={() => onClickUpdateImage()}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image style={styles.ImageAddtion} source={image ? {uri:`${image}`} : {uri:'https://storage.googleapis.com/codecamp-file-storage/2021/10/26/banner4.jpeg'}} />
            </TouchableOpacity>
            </Pressable>
        </ScrollView>
        <Pressable style={styles.ButtonStyle} onPress={() => onClickWriteProduct()} >
            <Text style={{color:'white',fontWeight:'bold'}}>상품등록</Text>
        </Pressable>
    </View>
    )
}