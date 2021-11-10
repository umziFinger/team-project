import {gql, useMutation, useQuery} from '@apollo/client';
import * as React from 'react';
import { Text, View, Image ,StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { FETCH_USED_ITEM,CREATE_USED_ITEM_QUESTION, FETCH_USED_ITEM_QUESTIONS } from '~/components/commons/market.queries';

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
       name:{
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
       }

})

export function MarketDetail(props:any) {
    const {data} = useQuery(FETCH_USED_ITEM , {
        variables: {useditemId:props.route.params.useditemId}
    });
    const {data: comments} = useQuery(FETCH_USED_ITEM_QUESTIONS, {
        variables: {useditemId: props.route.params.useditemId},
      });
    const[createUseditemQuestion] = useMutation(CREATE_USED_ITEM_QUESTION)
    const [contents, setContents] = React.useState("");

    function SubmitComment(){
        createUseditemQuestion({
            variables:{
                useditemId : props.route.params.useditemId,
                createUseditemQuestionInput :{
                    contents
                }
            },
            refetchQueries: [
                {
                  query: FETCH_USED_ITEM,
                  variables: {useditemId: props.route.params.useditemId},
                },
            ],
        })
    }

    return(
    <ScrollView>
        <View style={styles.Img}/>
        <View style={styles.Info__Wrapper}>
            <View style={styles.Contents__Wrapper}>
                <Text style={styles.name}>{data && data.fetchUseditem.name}</Text>
                <Text style={styles.remarks}>{data && data.fetchUseditem.remarks}</Text>
                <Text style={styles.price}>{data && data.fetchUseditem.price}</Text>    
                <Text style={styles.contents}>{data && data.fetchUseditem.contents}</Text>
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
            onChangeText={text=> setContents(text)}/>
            <Pressable style={styles.CommentButton}
                onPress={()=> SubmitComment()}>
                <Text>입력</Text>
            </Pressable>
            {comments?.fetchUseditemQuestions.map((el:any, index:number) => (
                <View key={el._id}>
                    <Text>{el.user.name}</Text>
                    <Text>{el.contents}</Text>
                </View>
            ))}
        </View>
    </ScrollView>
    )
}
