import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { Text, View, Image ,StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import auth from '@react-native-firebase/auth';


const styles = StyleSheet.create({
       Img:{
           width: '100%',
           height: 300,
           backgroundColor:'gray',
           borderRadius:10
       },
       Info__Wrapper:{
           
            width: '100%',
            height: 280,
            backgroundColor:'#ffffff',
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
           fontSize:16,
           marginBottom:10
       },
       BottomButton:{
           width: '90%' ,
           flexDirection:'row',
           justifyContent:"space-around"
       },
       CommentName:{
           fontWeight:'bold',
           fontSize:14
       }
})

export function MarketDetail({navigation,route}:any) {
    const [comment, setComment] = React.useState("");
    const [comments, setComments] = React.useState([]);

    const user:any = auth().currentUser;
    const isWriter = user.email === route.params.el[0].writer; // ?

    function SubmitComment(){
        if (comment !== '') {
            firestore()
              .collection('Market')
              .doc(route.params.el[1].id)
              .collection('Comments')
              .add({writer: user?.email, contents: comment, createdAt:new Date()});
        }
    }
    
    let tt: any = [];
    firestore()
        .collection('Market')
        .doc(route.params.el[1].id)
        .collection('Comments')
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
        snapshot.forEach(doc => {
            const temp: any = [];
            temp.push(doc.data());
            temp.push({id: doc.id});
            tt.push(temp);
        });
        setComments(tt);
        });

    function onClickDelete() {
        try{
        firestore()
        .collection('Market')
        .doc(route.params.el[1].id)
        .delete();
        navigation.navigate('MarketMain')
        } catch (error) {
            console.log(error)
        }
    }
    function onClickEdit() {
        navigation.navigate('MarketWrite', {route})
    }
    function onClickDeleteComment(commentid: any) {
        try {
          firestore()
            .collection('Market')
            .doc(route.params.el[1].id)
            .collection('Comments')
            .doc(commentid)
            .delete();
        } catch (error) {
          console.log(error);
        }
      }    
    const writer1 = route.params.el[0].writer.split("@")
    // console.log(writer1)
    // const CommentWriter = tt.temp.el[0].writer.split("@")
    return(
    <ScrollView>
        <Image 
            source={route.params.el[0].image ? {uri:`${route.params.el[0].image[0].image}`} : {uri:'https://storage.googleapis.com/codecamp-file-storage/2021/10/26/banner4.jpeg'}}
            style={styles.Img}/>
        <View style={styles.Info__Wrapper}>
            <View style={styles.Contents__Wrapper}>
                <Text style={styles.productName}>상품명 : {route.params.el[0].productName}</Text>
                <Text style={styles.price}>{route.params.el[0].price}원</Text>
                <Text style={styles.contents}>{route.params.el[0].contents}</Text>
                <Text >거래가능지역 : {route.params.el[0].setTreadArea}</Text>
                <Text style={{margin:10}}>판매자 : {writer1[0]}</Text>
            </View>
            <Pressable>
                <Text style={{ width:100 , height:30,textAlign:'center', backgroundColor: "pink",borderRadius:10,paddingTop:5,marginTop:50}}>
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
            {comments?.map((el,index) => (
                <View key = {index}> 
                    <View style={{flexDirection:'column', margin:15 ,backgroundColor:"white",padding:10,}}>
                        <Text style={{fontWeight:'bold',fontSize:14}}>{el[0].writer.split("@")[0]}</Text>
                        <Text style={{marginTop:10, width:"100%" }}>{el[0].contents}</Text>
                        {user.email === el[0].writer && (
                            <Pressable
                            style={{width:100,height:30,backgroundColor:'skyblue',alignItems:'center'}}
                            onPress={()=> onClickDeleteComment(el[1].id)}>
                            <Text>삭제</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            ))}
        </View>
            <Pressable style={styles.BottomButton}>
                {isWriter && (
                    <View style={{flexDirection:'row',justifyContent:'space-around', width:'65%'}}>
                        <Text onPress={onClickEdit} style={{width:75 , height:30,textAlign:'center', backgroundColor: "pink",borderRadius:10,paddingTop:5}}>수정하기</Text>
                        <Text onPress={onClickDelete} style={{width:75 , height:30,textAlign:'center', backgroundColor: "pink",borderRadius:10,paddingTop:5}}>삭제하기</Text>
                    </View>
                )}
                <View>
                    <Text onPress={()=> {navigation.navigate('MarketMain')}} style={{width:75 , height:30,textAlign:'center', backgroundColor: "pink",borderRadius:10,paddingTop:5}}>목록으로</Text>
                </View>
            </Pressable>
    </ScrollView>
    )
}
