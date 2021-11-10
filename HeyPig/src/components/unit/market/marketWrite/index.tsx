import { useMutation } from '@apollo/client';
import * as React from 'react';
import { Text, View, TextInput, StyleSheet, Button, ScrollView} from "react-native";
import {CREATE_USED_ITEM} from '~/components/commons/market.queries';
import firestore from '@react-native-firebase/firestore';


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
    }
})

export function MarketWrite() {
    
    const [name, setName] = React.useState("")
    const [price,setPrice] =React.useState("")
    const [contents,setContents] = React.useState("")
    const [remarks,setRemarks] = React.useState("")
    const [files , setFiles] = React.useState("")

    const [createUseditem] = useMutation(CREATE_USED_ITEM)

    async function onClickSubmit() {
       try{ if(
            name !== '' && 
            price !== '' &&
            contents !== '' 
            // &&
            // files !== ''
        ) {
            const result = await createUseditem({
                variables:{
                    createUseditemInput:{
                        name,
                        price,
                        remarks,
                        contents,
                        // files
                    }
                }
            })
             
            console.log(result)
         }} catch(error) {
             console.log(error)
         }
    }

    return(
    <View >
        <ScrollView>
            <Text>상품명</Text>
            <TextInput style={styles.Inputbox} onChangeText={text=>setName(text)}/>
            <Text>가격</Text>
            <TextInput style={styles.Inputbox} onChangeText={text=>setPrice(text)}/>
            <Text>한줄요약</Text>
            <TextInput style={styles.Inputbox} onChangeText={text=>setRemarks(text)}/>
            <Text>내용</Text>
            <TextInput style={styles.InputContents} onChangeText={text=>setContents(text)}/>
            <Button title="상품등록" onPress={() => onClickSubmit}/>
        </ScrollView>
    </View>
    )
}