import {gql, useQuery} from '@apollo/client';
import * as React from 'react';
import { Image, Text, TextInput, View, ScrollView, StyleSheet, Button, Pressable } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const FETCH_BOARDS = gql`
    query {
        fetchBoards{
            writer
            title
            contents
            images
        }
    }
`

const styles = StyleSheet.create({

    DiaryTitle: {
        width: 150,
        height: 40,
        marginRight: 250,
        marginTop: 10,
        marginBottom: 10
    },

    DiaryView: {
        flexDirection: 'row',

        height: 100, 
        width: 350, 
        borderRadius:10, 
        backgroundColor: "white", 
        margin: 10, 
        justifyContent:'flex-start', 
        alignItems: 'center',
        paddingHorizontal: 30,
        elevation: 3,
    },

    DiaryImage: {
        justifyContent:'center', 
        alignItems:'center',
        marginRight: 30
    }
})



export function DiaryMain({navigation}:any) {

    const {data} = useQuery(FETCH_BOARDS)
    
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date:any) => {
        console.log("A date has been picked: ", date);
        hideDatePicker();
    };

    return(
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <Image style={styles.DiaryTitle} source={require('../../../../Assets/images/diary.png')}/>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        <ScrollView>
            <View>
                {data?.fetchBoards.map((el:any,i:number) => 
                <Pressable key={i} onPress={() => navigation.navigate('DiaryDetail')}>
                    <View style={styles.DiaryView}>
                        <Image style={styles.DiaryImage} source={require('../../../../Assets/images/add.png')} />
                        <View>
                            <Text>writer:{el.writer}</Text>
                            <Text>title:{el.title}</Text>
                            <Text>contents:{el.contents}</Text>
                        </View>
                    </View>
                </Pressable>
                )}
            </View>
        </ScrollView>
      </View>
    )
  }