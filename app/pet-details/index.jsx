/* if pet from category is clicked it opens that particular pet detail page*/

import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import Colors from '../../constants/Colors';

export default function PetDetails() {
    const pet =useLocalSearchParams();
    const navigation=useNavigation();

    
    useEffect(()=>{
        navigation.setOptions({
            headerTransparent:true,
            headerTitle:''
        })
    },[])

    

  return (
    <View>
        <ScrollView>
        {/* pet info */ }
            <PetInfo pet={pet}/>

        { /* pet properties */ }
            <PetSubInfo pet={pet}/>

        {/* about */}
        
            <AboutPet pet={pet}/>

        {/* owner details */}
            <OwnerInfo pet={pet}/>
            <View style={{height:70}}>
            </View>
        </ScrollView>

        {/* adopt me button */}
        <View style={styles?.bottomContainer}>
            <TouchableOpacity
             style={styles.adoptBtn}>
                <Text style={{
                    textAlign:'center',
                    fontFamily:'outfit-medium',
                    fontSize:20
                }}>Adopt Me</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    adoptBtn:{
        padding:15,
        backgroundColor:Colors.PRIMARY
    },
    bottomContainer:{
        position:'absolute',
        width:'100%',
        bottom:0


    }
})