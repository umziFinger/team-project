import * as React from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

const styles = StyleSheet.create({

    Wrapper: {
        flex:1,
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center"
    },

    ImageWrapper: {
        width: 350,
        height: 400,
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "column",
        alignItems:'center',
        elevation: 4,
        margin:15,
        padding: 25
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
        height: 300,
    },

    TitleWrapper: {
        width: 300,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    InputStyle: {
        width: 200
    },

    DiaryTitle: {
        width: 150,
        height: 40,
        marginRight: 250,
        marginTop: 10,
        marginBottom: 10
    },

    SubmitButton: {
        backgroundColor: '#58ccff',
        width: 120,
        height: 40,
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems:'center',
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20
    }
})



export function DiaryWrite({navigation, route}:any) {

    const [date, setDate] = React.useState(0)

    const [title, setTitle] = React.useState('')
    const [weight, setWeight] = React.useState('')
    const [food, setFood] = React.useState('')
    const [exercise, setExercise] = React.useState('')

    const user:any = auth().currentUser

    const signinDate:any = new Date(user?.metadata.creationTime.slice(0,10))
    const currentDate:any = new Date(new Date().toISOString().slice(0,10))
  
    React.useEffect(() => {
      setDate((currentDate-signinDate)/(3600000*24))
    },[])

    async function writeDiary() {

        firestore().collection('Users').doc(String(user?.email)).collection("Diary").doc(`${String(date+1)}day`).set({ title, weight, food, exercise, createdAt: new Date().toISOString(), date:date+1 })
        navigation.navigate('DiaryMain')
    }

    return(
        <ScrollView>
            <View style={styles.Wrapper}>
                <Image style={styles.DiaryTitle} source={require('../../../../Assets/images/diary.png')}/>
                <View style={styles.ImageWrapper}>
                    <View style={styles.TitleWrapper}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{date+1}일차</Text>
                        <TextInput 
                            placeholder="제목을 입력해주세요" 
                            onChangeText={text => setTitle(text)}
                            defaultValue={route.params?.route.params.el.title}
                        />
                    </View>
                    <Image style={styles.TopImage} source={{uri:'https://storage.googleapis.com/codecamp-file-storage/2021/10/26/banner4.jpeg'}}/>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>체중 :</Text>
                    <TextInput 
                        style={styles.InputStyle} 
                        placeholder="체중을 입력해주세요." 
                        defaultValue={route.params?.route.params.el.weight} 
                        onChangeText={text => setWeight(text)}
                    />
                    <View style={styles.WeightColorLine}></View>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>식단 :</Text>
                    <TextInput 
                        style={styles.InputStyle} 
                        placeholder="식단을 입력해주세요." 
                        onChangeText={text => setFood(text)}
                        defaultValue={route.params?.route.params.el.food}
                    />
                    <View style={styles.FoodColorLine}></View>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>운동 :</Text>
                    <TextInput 
                        style={styles.InputStyle} 
                        placeholder="운동을 입력해주세요." 
                        onChangeText={text => setExercise(text)}
                        defaultValue={route.params?.route.params.el.exercise}
                    />
                    <View style={styles.WorkOutColorLine}></View>
                </View>
                <TouchableOpacity style={styles.SubmitButton} onPress={writeDiary}>
                    <Text style={{ color: 'white', fontWeight: 'bold'}}>등록하기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

}