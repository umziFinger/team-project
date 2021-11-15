import * as React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

const styles = StyleSheet.create({

    Wrapper: {
        flex:1,
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center"
    },

    TitleWrapper: {
        width:300,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

    DateText: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    TitleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    ImageWrapper: {
        width: 350,
        height: 350,
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",
        elevation: 4,
        margin:15
    },

    ContentsWrapper: {
        width: 350,
        height: 100,
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        elevation: 4,
        margin: 5,
        paddingLeft: 20
    },

    WeightColorLine: {
        width: 10,
        height: 100,
        backgroundColor: "#FEA8A8",
        marginRight: 20
    },

    FoodColorLine: {
        width: 10,
        height: 100,
        backgroundColor: "#CBF4B1",
        marginRight: 20
    },

    WorkOutColorLine: {
        width: 10,
        height: 100,
        backgroundColor: "#5BCEFF",
        marginRight: 20
    },

    TopImage: {
        width: 300,
        height: 300
    },

    EditButton: {
        width: 100, 
        height:30, 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor: '#58ccff',
        borderRadius:5,
    },

    DeleteButton: {
        width: 100, 
        height:30, 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor: 'white',
        elevation:4,
        borderRadius:5,
        marginRight: 10
    }
})



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
        <ScrollView>
            <View style={styles.Wrapper}>
                <View style={styles.ImageWrapper}>
                    <View style={styles.TitleWrapper}>
                        <Text style={styles.DateText}>{route.params.el.date}일차</Text>
                        <Text style={styles.TitleText}>{route.params.el.title}</Text>
                    </View>
                    <Image style={styles.TopImage} source={route.params.el.image ? {uri:`${route.params.el.image}`} : {uri:'https://storage.googleapis.com/codecamp-file-storage/2021/10/26/banner4.jpeg'}}/>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>체중 :</Text>
                    <Text>{route.params.el.weight}</Text>
                    <View style={styles.WeightColorLine}></View>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>식단 :</Text>
                    <Text>{route.params.el.food}</Text>
                    <View style={styles.FoodColorLine}></View>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>운동 :</Text>
                    <Text>{route.params.el.exercise}</Text>
                    <View style={styles.WorkOutColorLine}></View>
                </View>
                <View style={{flexDirection: 'row', alignItems:'center', marginLeft: 140, marginTop: 20}}>
                    <TouchableOpacity style={styles.DeleteButton} onPress={onClickDelete}>
                        <Text style={{fontWeight: 'bold', color:'gray'}}>삭제하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.EditButton} onPress={onClickEdit}>
                        <Text style={{fontWeight: 'bold', color:'white'}}>수정하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}