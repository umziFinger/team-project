import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    Wrapper: {
        flex:1,
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor: '#ffd600'
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
        fontFamily:'Yangjin'
    },

    TitleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    ImageWrapper: {
        width: 350,
        height: 370,
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
        backgroundColor: '#ffd600',
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