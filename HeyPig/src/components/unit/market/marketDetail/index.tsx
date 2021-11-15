import {gql, useMutation, useQuery} from '@apollo/client';
import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { Text, View, Image ,StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { TabRouter } from 'react-navigation';
import { FETCH_USED_ITEM,CREATE_USED_ITEM_QUESTION, FETCH_USED_ITEM_QUESTIONS } from '~/components/commons/market.queries';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
       Img:{
           width: 400,
           height: 200,
           backgroundColor:'gray',
       },
       Info__Wrapper:{
            width: 400,
            height: 230,
            backgroundColor:'#ddf5ff',
            marginTop:25,
            flexDirection:'row',
            justifyContent:'space-between',
            padding: 20,
            paddingRight:50,
            paddingLeft:30
       },
       Heart:{
           justifyContent:'flex-end',
            
           
       },
       Contents__Wrapper:{
        width: "100%",
        
        
       },
       Pick__Wrapper:{
           
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

       }

})

export function MarketDetail({navigation,route}:any) {
    // const {data} = useQuery(FETCH_USED_ITEM , {
    //     variables: {useditemId:props.route.params.useditemId}
    // });
    // const {data: comments} = useQuery(FETCH_USED_ITEM_QUESTIONS, {
    //     variables: {useditemId: props.route.params.useditemId},
    //   });
    // const[createUseditemQuestion] = useMutation(CREATE_USED_ITEM_QUESTION)
    // function SubmitComment(){
    //     createUseditemQuestion({
    //         variables:{
    //             useditemId : props.route.params.useditemId,
    //             createUseditemQuestionInput :{
    //                 contents
    //             }
    //         },
    //         refetchQueries: [
    //             {
    //               query: FETCH_USED_ITEM,
    //               variables: {useditemId: props.route.params.useditemId},
    //             },
    //         ],
    //     })
    // }
    const [comment, setComment] = React.useState("");
    const user: any = auth().currentUser;
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
    return(
    <ScrollView>
        <View style={styles.Img}/>
        <View style={styles.Info__Wrapper}>
            <View style={styles.Contents__Wrapper}>
                <Text style={styles.productName}>{route.params.el.productName}</Text>
                <Text style={styles.remarks}>{route.params.el.remarks}</Text>
                <Text style={styles.price}>{route.params.el.price}</Text>    
                <Text style={styles.contents}>{route.params.el.contents}</Text>
            </View>
            <View style={styles.Pick__Wrapper}>
            <Image style={styles.Heart} source={require('../../../../Assets/images/Heart.png')}/>
            <Text>0</Text>
            </View>
            <Pressable>
                <Text>구매하기</Text>
            </Pressable>
        </View>
        <View>
            <Text style={{marginTop:30}}>댓글</Text>
            <TextInput style={styles.CommentBox}
                placeholder="내용을 입력해주세요"
                onChangeText={text=> setComment(text)}/>
            <Pressable style={styles.CommentButton}
                onPress={()=> SubmitComment()}>
                <Text>입력</Text>
            </Pressable>
            {/* {comments?.fetchUseditemQuestions.map((el:any, index:number) => (
                <View key={el._id}>
                    <Text>{el.user.name}</Text>
                    <Text>{el.contents}</Text>
                </View>
            ))} */}
        </View>
        <Pressable style={styles.BottomButton}>
            {/* <Text style={{backgroundColor:}}>수정하기</Text>
            <Text style={{backgroundColor:}}>삭제하기</Text>
            <Text style={{backgroundColor:}}>목록으로</Text> */}
        </Pressable>
    </ScrollView>
    )
}
