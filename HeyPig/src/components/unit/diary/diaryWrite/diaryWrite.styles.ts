import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    Wrapper: {
        flex:1,
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center"
    },

    ImageWrapper: {
        width: 350,
        height: 370,
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "column",
        alignItems:'center',
        elevation: 4,
        margin:15,
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
        backgroundColor: '#ffd600',
        width: 120,
        height: 40,
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems:'center',
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        width: 250,
        height: 160,
        backgroundColor: "white",
        padding: 20,
        elevation: 5,
        borderRadius: 5,
    },
    
    button: {
        marginTop: 10,
        marginLeft: 170,
        width: 50,
        padding: 5,
    },
      
    buttonClose: {
        // backgroundColor: "#2196F3",
    },
      
    textStyle: {
        fontWeight: "bold",
        textAlign: "center"
    },
      
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold'
    }
})