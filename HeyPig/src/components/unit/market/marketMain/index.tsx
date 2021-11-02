import * as React from 'react';
import { Image, Text, TextInput, View, ScrollView, StyleSheet ,Button} from 'react-native';
const styles = StyleSheet.create({
    Banner: {
        height: 200,
        width:400,
        margin: 5,
        backgroundColor:"gray"
    },
    DiaryView: {
        height: 120, 
        width: 400, 
        borderRadius:10, 
        backgroundColor: "white", 
        margin: 10, 
        justifyContent:'center', 
        paddingHorizontal: 30,
        elevation: 3,
    },

    marketImage: {
        justifyContent:'center', 
        alignItems:'center'
    },
    BestProduct:{
        fontSize:18,
        fontWeight:'bold',
    },
    ProductContents:{
    },
    ProductPrice:{
    },
    ProductSeller:{
    }
})

export function MarketMain({navigation}) {
    return(
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>    
      <Text style={styles.BestProduct}>Best 상품</Text>
        <ScrollView>
            <View>
                <View style={styles.Banner} />
                {new Array(10).fill(1).map((el,i) => 
                <View key={i} style={styles.DiaryView}>
                    <Image style={styles.marketImage} source={require('../../../../Assets/images/add.png')} />
                    <Text style={styles.ProductContents}>내용 : </Text>
                    <Text style={styles.ProductPrice}>가격 : </Text>
                    <Text style={styles.ProductSeller}>판매자 :</Text>
                </View>)}
            </View>
        </ScrollView>
            <Button title="detail" onPress={() => navigation.navigate('MarketDetail')}/>
            <Button title="write" onPress={() => navigation.navigate('MarketWrite')}/>
      </View>
    )
}
