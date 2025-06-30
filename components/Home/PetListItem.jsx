import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MarkFav from './../../components/MarkFav';
import Colors from './../../constants/Colors';

/*to display the image of the pet once selected the category, below category*/

export default function PetListItem({pet}) {
const router=useRouter();

  return (
    <TouchableOpacity
    onPress={()=>router.push({
      pathname:'/pet-details',
      params:pet
    })}
    
    style={{
        padding:10,
        marginRight:15,
        backgroundColor:Colors.WHITE,
        borderRadius:10     
    }}>

        <View style={{
          position:'absolute',
          zIndex:10,
          right:10,
          top:10
        }}>
          <MarkFav pet ={pet} color={'white'}/>
        </View>

      <Image source ={{uri:pet?.imageUrl}}
      style={{
        width:150,
        height:135,
        objectFit:'cover',
        borderRadius:10
      }}
      />
      {/*to display the pet name*/}
    <Text style={{
        fontFamily:'outfit-medium',
        fontSize:18
    }}>{pet?.name}</Text>

    {/*to display the pet breed*/}
    <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }}>
        <Text style={{
        color:Colors.GRAY,
        fontFamily:'outfit'
    }}> {pet?.breed}</Text>
        {/*to display age*/}
        <Text style={{
            fontFamily:'outfit',
            color:Colors.PRIMARY,
            paddingHorizontal:6,
            borderRadius:10,
            fontSize:12,
            backgroundColor:Colors.LIGHT_PRIMARY
        }}>{pet.age} YRS</Text>
    </View>




    </TouchableOpacity>
  )
}