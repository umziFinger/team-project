import * as React from 'react';
import { Image, Text, TextInput, View, ScrollView, StyleSheet ,Button, Dimensions} from 'react-native';
import Carousel from './Carousel';
const styles = StyleSheet.create({
    Banner: {
        height: 200,
        width:400,
        margin: 5,
        backgroundColor:"gray"
    },
    marketMain: {
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
const screenWidth = Math.round(Dimensions.get('window').width);
const PAGES = [
    {
      num: 1,
      color: '#86E3CE',
    },
    {
      num: 2,
      color: '#D0E6A5',
    },
    {
      num: 3,
      color: '#FFDD94',
    },
    {
      num: 4,
      color: '#FA897B',
    },
    {
      num: 5,
      color: '#CCABD8',
    },
  ];

export function MarketMain({navigation}) {
    return(
        
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>    
      
        <ScrollView>
        <Text style={styles.BestProduct}>Best 상품</Text>
      <Carousel
          gap={16}
          offset={36}
          pages={PAGES}
          pageWidth={screenWidth - (16 + 36) * 2}
        />
     
            <View>
                {new Array(10).fill(1).map((el,i) => 
                <View key={i} style={styles.marketMain}>
                    
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

