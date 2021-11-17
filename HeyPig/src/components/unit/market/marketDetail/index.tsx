import {gql, useMutation, useQuery} from '@apollo/client';
import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { Text, View, Image ,StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { TabRouter } from 'react-navigation';
import { FETCH_USED_ITEM,CREATE_USED_ITEM_QUESTION, FETCH_USED_ITEM_QUESTIONS } from '~/components/commons/market.queries';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
       Img:{
           width: '100%',
           height: 200,
           backgroundColor:'gray',
           borderRadius:10
       },
       Info__Wrapper:{
           
            width: '100%',
            height: 230,
            backgroundColor:'#ddf5ff',
            marginTop:25,
            alignItems:'center',
            // flexDirection:'row',
            // justifyContent:'space-between',
            padding: 20,
            paddingRight:50,
            paddingLeft:30,
            borderRadius:10
       },
       Heart:{
           justifyContent:'flex-end',
            
           
       },
       Contents__Wrapper:{
        width: "100%",
        
        
       },
       Pick__Wrapper:{
           marginLeft:'95%'
           
       },
       CommentBox:{
            width: 400,
            height: 50,
            backgroundColor:'white'
       },
       CommentButton:{

       },
       productName:{
        fontSize:22,
        fontFamily:"bold",
        marginBottom:10
       },
       remarks:{
           fontSize:13,
           marginBottom:10
       },
       price:{
           fontSize:15,
           marginBottom:10
       },
       contents:{
           fontSize:14,
           marginBottom:10
       },
       BottomButton:{
           width: '100%' ,
           flexDirection:'row',
           justifyContent:"space-evenly"
       },
       CommentName:{
           fontWeight:'bold',
           fontSize:14
       }

})

export function MarketDetail({navigation,route}:any) {
    const [comment, setComment] = React.useState("");

    const user = auth().currentUser;

    function SubmitComment(){
        if (comment !== '') {
            firestore()
              .collection('Market')
              .doc(route.params.el.id)
              .collection('Comments')
              .add({writer: user?.email, contents: comment});
          }
    }
    function onClickDelete() {
        firestore()
        .collection('Market')
        .doc(route.params.el.id)
        .delete()
        .then(() => {
            navigation.navigate('MarketMain')
        })
    }
    function onClickEdit() {
        navigation.navigate('MarketWrite', {route})
    }
    return(
    <ScrollView>
        <View style={styles.Img}/>
        <View style={styles.Info__Wrapper}>
            <View style={styles.Contents__Wrapper}>
                <Text style={styles.productName}>상품명 : {route.params.el.productName}</Text>
                <Text style={styles.price}>{route.params.el.price}원</Text>
                <Text style={styles.contents}>{route.params.el.contents}</Text>
                <Text>판매자 : {route.params.el.name}</Text>
            </View>
            <Pressable>
                <Text style={{ width:100 , height:30, backgroundColor: "pink",borderRadius:10,textAlign:'center',paddingTop:5,marginTop:50}}>
                    구매하기
                </Text>
            </Pressable>
        </View>
        <View>
            <Text style={{margin:15}}>댓글</Text>
            <TextInput
                style={styles.CommentBox}
                placeholder="내용을 입력해주세요"
                onChangeText={text=> setComment(text)}/>
            <Pressable
                style={styles.CommentButton}
                onPress={()=> SubmitComment()}>
                <Text style={{width:50,height:30,backgroundColor:"#fff884", borderRadius:10,textAlign:'center',paddingTop:5 ,margin:10} }>입력</Text>
            </Pressable>
            <View> 
                <View style={{height:"100%",flexDirection:'column', margin:15 ,backgroundColor:"white",padding:15,}}>
                    <Text style={{fontWeight:'bold',fontSize:14}}>김송박
                    </Text>
                    <Text style={{marginTop:10}}>내용</Text>
                </View>
                <View>
                    <View></View>
                </View>
            </View>
        </View>

        <Pressable style={styles.BottomButton}>
            <Text onPress={onClickEdit} style={{backgroundColor:'#FFE1E1'}}>수정하기</Text>
            <Text onPress={onClickDelete} style={{backgroundColor:'#030101'}}>삭제하기</Text>
            <Text onPress={()=> {navigation.navigate('MarketMain')}} style={{backgroundColor:'#FFE1E1'}}>목록으로</Text>
        </Pressable>
    </ScrollView>
    )
}
