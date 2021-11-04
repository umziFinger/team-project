import * as React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({

    Wrapper: {
        flex:1,
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center"
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
    }
})



export function DiaryDetail() {

    return(
        <ScrollView>
            <View style={styles.Wrapper}>
                <View style={styles.ImageWrapper}>
                    <Image style={styles.TopImage} source={{uri:'https://storage.googleapis.com/codecamp-file-storage/2021/10/26/banner4.jpeg'}}/>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>체중 :</Text>
                    <View style={styles.WeightColorLine}></View>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>식단 :</Text>
                    <View style={styles.FoodColorLine}></View>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>운동 :</Text>
                    <View style={styles.WorkOutColorLine}></View>
                </View>
            </View>
        </ScrollView>
    )

}