import { useMutation } from '@apollo/client';
import * as React from 'react';
import { Text, View, TextInput, StyleSheet, Button, ScrollView, Pressable} from "react-native";
import {CREATE_USED_ITEM} from '~/components/commons/market.queries';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
      ImageStyle:{
          height: 70,
          width: 70,
          backgroundColor:"gray",
          justifyContent:'center',
          alignItems:'center',
          margin: 20
      }
})

export function MarketWrite({navigation,route}:any) {
    const user = auth().currentUser;
    const writer = user?.email;
    const [productName, setProductName] = React.useState("")
    const [price,setPrice] =React.useState("")
    const [contents,setContents] = React.useState("")
    const [remarks,setRemarks] = React.useState("")
    const [name, setName] = React.useState("")
    const [files , setFiles] = React.useState("")

    // const [createUseditem] = useMutation(CREATE_USED_ITEM)
    // async function onClickSubmit() {
    //    try{ if(
    //         name !== '' && 
    //         price !== '' &&
    //         contents !== '' 
    //         // &&
    //         // files !== ''
    //     ) {
    //         const result = await createUseditem({
    //             variables:{
    //                 createUseditemInput:{
    //                     name,
    //                     price,
    //                     remarks,
    //                     contents,
    //                     // files
    //                 }
    //             }
    //         })
             
    //         console.log(result)
    //      }} catch(error) {
    //          console.log(error)
    //      }
    // }
    async function onClickWriteProduct(){
        firestore()
        .collection('Market')
        .add({writer,productName,price,remarks,contents,name})
        navigation.navigate('MarketMain');
    }
    async function onClickUpdateImage() {

    }

    return(
    <View >
        <ScrollView>
            <Text>판매자</Text>
            <TextInput
                style={styles.Inputbox}
                onChangeText={text=>setName(text)}
                // defaultValue={route.params?.route.params.el.name}
            />
            <Text>상품명</Text>
            <TextInput
                style={styles.Inputbox}
                onChangeText={text=>setProductName(text)}
                // defaultValue={route.params?.route.params.el.productname}
                />
            <Text>가격</Text>
            <TextInput 
                style={styles.Inputbox} 
                onChangeText={text=>setPrice(text)}
                // defaultValue={route.params?.route.params.el.price}
                />
            <Text>한줄요약</Text>
            <TextInput 
                style={styles.Inputbox} 
                onChangeText={text=>setRemarks(text)}
                // defaultValue={route.params?.route.params.el.remarks}
                />
            <Text>내용</Text>
            <TextInput 
                style={styles.InputContents} 
                onChangeText={text=>setContents(text)}
                // defaultValue={route.params?.route.params.el.contents}
                />
            <Pressable style={styles.ImageStyle} onPress={() => onClickUpdateImage()}>
                <Text>+</Text>
            </Pressable>
        </ScrollView>
        <Pressable style={styles.ButtonStyle} onPress={() => onClickWriteProduct()} >
            <Text style={{color:'white',fontWeight:'bold'}}>상품등록</Text>
        </Pressable>
    </View>
    )
}