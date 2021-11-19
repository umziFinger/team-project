import {gql, useQuery} from '@apollo/client';
import * as React from 'react';
import { Image, Text, View, ScrollView, StyleSheet , Dimensions, Pressable} from 'react-native';
import Carousel from './Carousel';
// import styled from 'styled-components/native';
import { FETCH_USED_ITEMS } from '~/components/commons/market.queries'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
    Banner: {
        height: 200,
        width:'95%',
        margin: '5%',
        backgroundColor:"gray"
    },
    marketMain: {
      flexDirection: 'row',
      // height: '10%',
      width: '90%', 
      height: 120,
      borderRadius:10, 
      backgroundColor: "white", 
      margin: '5%', 
      justifyContent:'flex-start', 
      alignItems: 'center',
      paddingHorizontal: 30,
      elevation: 3,
    },
    marketImage: {
        justifyContent:'center', 
        alignItems:'center',
        
        marginRight:30
    },
    supermarket:{
      width: 150,
      height: 40,
      marginRight: 250,
      marginTop: 10,
      marginBottom: 10,
      marginLeft:5
    },
    Wrapper:{

        
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
      backgroundColor: '#58ccff',
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
export function MarketMain({navigation}:any) {
  const [market,setMarket] = React.useState([])
  let tt : any = []
  const user = auth().currentUser

  React.useEffect(() => {
    const doc = firestore()
      .collection('Market')
      .get()
      .then(snapshot=>{
        snapshot.forEach(doc=>{
          let aaa : any = []
          aaa.push(doc.data())
          aaa.push({id:doc.id}) 
          tt.push(aaa)
      });
      setMarket(tt);
    });    
  }, [firestore().collection('Market').doc('').get()]);

  // firestore()
  //   .collection('Market')
  //   .get()
  //   .then(snapshop => {
  //     snapshop.forEach(doc => {
  //       let bbb : any = []
  //       bbb.push(doc.data())
  //       bbb.push({id:doc.id})
  //       aaa.push(bbb)
  //     })
  //     setMarket(aaa)
  //   })
    return(
      <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>    
        <ScrollView >
             {/* <Text style={styles.BestProduct}>Best 상품</Text> */}
             <Image style={styles.supermarket} source={require('../../../../Assets/images/supermarket.png')}/>
            
          <Carousel
            gap={5}
            offset={0} // left margin
            pages={PAGES}
            // pageWidth={screenWidth} 

                pageWidth={screenWidth - (2+1) * 2}
          />
        <View>
          <View  style={styles.Wrapper}>
            {market?.map((el:any,i:number) =>
              <Pressable 
                key={i} 
                style={styles.marketMain} 
                onPress={() => navigation.navigate('MarketDetail',{el})}>
                <Image style={styles.marketImage} source={require('../../../../Assets/images/add.png')} />
                <View> 
                  <View style={styles.contentsWrapper}>
                    <Text >상품명 : {el.productName}</Text>
                    <Text style={styles.contents}>상품설명 : {el.contents}</Text>
                    <Text style={styles.price}>가격 : {el.price}</Text>
                    <Text style={styles.name}>판매자 : {el.name}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          </View>
        </View>
        </ScrollView>
            
            <Pressable style={styles.ButtonStyle} onPress={() => navigation.navigate('MarketWrite')}>
              <Text style={{color: 'white', fontWeight: "bold"}}>상품등록</Text>
            </Pressable>
      </View>
    )
}
