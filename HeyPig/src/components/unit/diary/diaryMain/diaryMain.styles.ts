import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    DiaryTitle: {
      width: 150,
      height: 40,
      marginRight: 250,
      marginTop: 10,
      marginBottom: 10,
    },
  
    DiaryView: {
      flexDirection: 'row',
  
      height: 100,
      width: 350,
      borderRadius: 10,
      backgroundColor: 'white',
      margin: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 10,
      elevation: 3,
    },
  
    DiaryImage: {
      width:80,
      height:80,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 30,
    },
  
    ButtonStyle: {
      position: 'absolute',
      backgroundColor: '#ffd600',
      right: 30,
      bottom: 30,
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
  });
  