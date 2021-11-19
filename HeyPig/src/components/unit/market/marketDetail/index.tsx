import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { Text, View, Image ,StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
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
    const [comments, setComments] = React.useState("");

    const user:any = auth().currentUser;
    const isWriter = user.email === route.params.el.writer; // ?

    function SubmitComment(){
        if (comment !== '') {
            firestore()
              .collection('Market')
              .doc(route.params.el.id)
              .collection('Comments')
              .add({writer: user?.email, contents: comment});
        }
    }
    // let tt: any = [];
    // ???
    // firestore()
    // .collection('Market')
    // .doc(route.params.el.id)
    // .collection('Comments')
    // .get()
    // .then(snapshot => {
    //   snapshot.forEach(doc => {
    //     const temp: any = [];
    //     temp.push(doc.data());
    //     temp.push({id: doc.id});
    //     tt.push(temp);
    //   });
    //   setComments(tt);
    // });

    function onClickDelete() {
        try{
        firestore()
        .collection('Market')
        .doc(route.params.el.id)
        .delete();
        navigation.navigate('MarketMain')
        } catch (error) {
            console.log(error)
        }
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
                onChangeText={text=> setComment(text)}
            />
            <Pressable
                style={styles.CommentButton}
                onPress={()=> SubmitComment()}>
                <Text style={{width:50,height:30,backgroundColor:"#fff884", borderRadius:10,textAlign:'center',paddingTop:5 ,margin:10} }>입력</Text>
            </Pressable>
            
            <View> 
                <View style={{flexDirection:'column', margin:15 ,backgroundColor:"white",padding:15,}}>
                    <Text style={{fontWeight:'bold',fontSize:14}}>김송박</Text>
                    <Text style={{marginTop:10}}>내용</Text>
                </View>
            </View>

        </View>
        <Pressable style={styles.BottomButton}>
            <Text onPress={onClickEdit} style={{backgroundColor:'#FFE1E1'}}>수정하기</Text>
            <Text onPress={onClickDelete} style={{backgroundColor:'#FFE1E1'}}>삭제하기</Text>
            <Text onPress={()=> {navigation.navigate('MarketMain')}} style={{backgroundColor:'#FFE1E1'}}>목록으로</Text>
        </Pressable>
    </ScrollView>
    )
}
