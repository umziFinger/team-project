import * as React from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./diaryDetail.styles";

export default function DiaryDetailUI(props:any) {

    return(
        <ScrollView>
            <View style={styles.Wrapper}>
                <View style={styles.ImageWrapper}>
                    <View style={styles.TitleWrapper}>
                        <Text style={styles.DateText}>{props.route.params.el.date}일차</Text>
                        <Text style={styles.TitleText}>{props.route.params.el.title}</Text>
                    </View>
                    <Image 
                        style={styles.TopImage} 
                        source={props.route.params.el.image 
                            ? 
                            {uri:`${props.route.params.el.image}`} 
                            : 
                            {uri:'https://storage.googleapis.com/codecamp-file-storage/2021/10/26/banner4.jpeg'}
                        }/>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text style={{fontFamily:'Yangjin'}}>체중 :</Text>
                    <Text style={{fontFamily:'Yangjin', fontSize: 20}}>{props.route.params.el.weight}kg</Text>
                    <View style={styles.WeightColorLine}></View>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text style={{fontFamily:'Yangjin'}}>식단 :</Text>
                    <Text style={{fontFamily:'Yangjin', fontSize: 20}}>{props.route.params.el.food}</Text>
                    <View style={styles.FoodColorLine}></View>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text style={{fontFamily:'Yangjin'}}>운동 :</Text>
                    <Text style={{fontFamily:'Yangjin', fontSize: 20}}>{props.route.params.el.exercise}</Text>
                    <View style={styles.WorkOutColorLine}></View>
                </View>
                <View style={{flexDirection: 'row', alignItems:'center', marginLeft: 140, marginTop: 20, marginBottom: 20}}>
                    <TouchableOpacity style={styles.DeleteButton} onPress={props.onClickDelete}>
                        <Text style={{fontWeight: 'bold', color:'gray'}}>삭제하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.EditButton} onPress={props.onClickEdit}>
                        <Text style={{fontWeight: 'bold', color:'white'}}>수정하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

}