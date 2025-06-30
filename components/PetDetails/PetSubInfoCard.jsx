/* to display the card on pet details page the 4 cards (like boxes - age) this page contains the style and common info like image, title, value this will be  imported to petsubimo where using this container values are filled inside*/

import { Image, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function PetSubInfoCard({icon,title,value}) {
  return (
      <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                backgroundColor:Colors.WHITE,
                padding:10,
                margin:5,
                borderRadius:8,
                gap:10,
                flex:1 
    
            }}>
                <Image source ={icon}  /*the small calendar image*/
                style={{
                    width:40,
                    height:40
                }}
                />
                <View style={{
                    flex:1
                }}>
                    <Text style={{
                        fontFamily:'outfit',
                        fontSize:16,
                        color:Colors.GRAY
                    }}>{title}</Text>
                    <Text style={{
                        fontFamily:'outfit-medium',
                        fontSize:12
                    }}>{value}</Text>
                </View>
            </View>
  )
}