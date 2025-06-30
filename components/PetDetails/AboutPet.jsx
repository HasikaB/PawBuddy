/* To display about details of pet on the pet details page*/
/*numberOfLines={3} which means in about it only shows first 3 lines */


import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function AboutPet({pet}) {
const [readMore,setReadMore]=useState(true);

  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fonrsize:20
      }}>AboutPet {pet?.name}</Text>
      <Text numberOfLines={readMore?3:20} style={{
        fontFamily:'outfit',
        fontSize:14,

      }}>{pet.about}</Text>
      {readMore&&
      <Pressable onPress={()=>setReadMore(false)}>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:14,
            color:Colors.SECONDARY
        }}>Read More</Text>
      </Pressable>}
    </View>
  )
}
