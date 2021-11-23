import * as React from 'react'
import { 
    Image, 
    Modal, 
    ScrollView, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View 
} from "react-native";
import { styles } from './diaryWrite.styles';


export default function DiaryWriteUI(props:any) {

    return(
        <ScrollView>
            <View style={styles.centeredView}>
                <Modal
                    // animationType="slide"
                    transparent={true}
                    visible={props.modalVisible}
                    onRequestClose={() => {
                        props.setModalVisible(!props.modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>사진</Text>
                        <TouchableOpacity style={{marginTop: 7}} onPress={props.addCameraImage}>
                            <Text>카메라</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop: 5}} onPress={props.addGalleryImage}>
                            <Text>이미지 선택</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => props.setModalVisible(!props.modalVisible)}
                        >
                            <Text style={styles.textStyle}>취소</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.Wrapper}>
                <Image style={styles.DiaryTitle} source={require('../../../../Assets/images/diary.png')}/>
                <View style={styles.ImageWrapper}>
                    <View style={styles.TitleWrapper}>
                        <Text style={{fontSize: 20, fontFamily: 'Yangjin'}}>{props.date+1}일차</Text>
                        <TextInput 
                            placeholder="제목을 입력해주세요" 
                            onChangeText={text => props.setTitle(text)}
                            defaultValue={props.route.params?.route.params.el.title}
                        />
                    </View>
                    <TouchableOpacity onPress={() => props.setModalVisible(true)}>
                        <Image style={styles.TopImage} source={props.image ? {uri:`${props.image}`} : {uri:'https://storage.googleapis.com/codecamp-file-storage/2021/10/26/banner4.jpeg'}} />
                    </TouchableOpacity>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>체중 :</Text>
                    <TextInput 
                        style={styles.InputStyle} 
                        placeholder="체중을 입력해주세요(kg생략)." 
                        defaultValue={props.route.params?.route.params.el.weight} 
                        onChangeText={text => props.setWeight(text)}
                    />
                    <View style={styles.WeightColorLine}></View>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>식단 :</Text>
                    <TextInput 
                        style={styles.InputStyle} 
                        placeholder="식단을 입력해주세요." 
                        onChangeText={text => props.setFood(text)}
                        defaultValue={props.route.params?.route.params.el.food}
                    />
                    <View style={styles.FoodColorLine}></View>
                </View>
                <View style={styles.ContentsWrapper}>
                    <Text>운동 :</Text>
                    <TextInput 
                        style={styles.InputStyle} 
                        placeholder="운동을 입력해주세요." 
                        onChangeText={text => props.setExercise(text)}
                        defaultValue={props.route.params?.route.params.el.exercise}
                    />
                    <View style={styles.WorkOutColorLine}></View>
                </View>
                <TouchableOpacity style={styles.SubmitButton} onPress={props.writeDiary}>
                    <Text style={{ fontFamily:'Yangjin'}}>등록하기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

}