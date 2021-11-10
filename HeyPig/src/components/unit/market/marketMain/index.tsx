import {gql, useQuery} from '@apollo/client';
import * as React from 'react';
import { Image, Text, View, ScrollView, StyleSheet , Dimensions, Pressable} from 'react-native';
import Carousel from './Carousel';
// import styled from 'styled-components/native';
import { FETCH_USED_ITEMS } from '~/components/commons/market.queries'
const styles = StyleSheet.create({
    Banner: {
        height: 200,
        width:400,
        margin: 5,
        backgroundColor:"gray"
    },
    marketMain: {
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
    marketImage: {
        justifyContent:'center', 
        alignItems:'center',
        
        marginRight:15
    },
    BestProduct:{
        fontSize:18,
        fontWeight:'bold',
    },
    Wrapper:{
        // flexDirection: 'row'
        
    },
    contentsWrapper:{

    },
    contents:{
      

    },
    price:{
      marginTop:5
    },
    name:{},
    ButtonStyle: {
      position: 'absolute',
      backgroundColor: '#89FF7F',
      right: 30,
      bottom: 30,
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
})
const screenWidth = Math.round(Dimensions.get('window').width);
const PAGES = [
    {
    //   num: 1,
      color: '#86E3CE',
    },
    {
    //   num: 2,
      color: '#D0E6A5',
    },
    {
    //   num: 3,
      color: '#FFDD94',
    },
    {
    //   num: 4,
      color: '#FA897B',
    },
    {
    //   num: 5,
      color: '#CCABD8',
    },
  ];
export function MarketMain({navigation}) {
  const { data } = useQuery(FETCH_USED_ITEMS);
    return(
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>    
        <ScrollView>
             <Text style={styles.BestProduct}>Best 상품</Text>
          <Carousel
            gap={5}
            offset={0} // left margin
            pages={PAGES}
            pageWidth={screenWidth} 
              //   pageWidth={screenWidth - (16 + 36) * 2}
          />
         <View>
          <View  style={styles.Wrapper}>
            {data?.fetchUseditems.map((el:any,i:number) =>
              <Pressable key={i} style={styles.marketMain} onPress={() => navigation.navigate('MarketDetail', {useditemId : el._id})}>
                <Image style={styles.marketImage} source={require('../../../../Assets/images/add.png')} />
                <View> 
                  <View style={styles.contentsWrapper}>
                    <Text >상품이름 : {el.name}</Text>
                    <Text style={styles.contents}>상품설명 : {el.contents}</Text>
                    <Text style={styles.price}>가격 : {el.price}</Text>
                    <Text style={styles.name}>판매자 : {el.seller.name}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          </View>
        </View>
        </ScrollView>
            {/* <Button title="detail" onPress={() => navigation.navigate('MarketDetail')}/> */}
            <Pressable style={styles.ButtonStyle} onPress={() => navigation.navigate('MarketWrite')}>
            <Text style={{color: 'white', fontWeight: "bold"}}>상품등록</Text>
            </Pressable>
      </View>
    )
}
 
