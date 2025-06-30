/*contains pet details page 4 boxes details*/

import { View } from 'react-native';
import PetSubInfoCard from './PetSubInfoCard';

export default function PetSubInfo({pet}) {
  return (
    <View style={{
        paddingHorizontal:20

    }}>
      <View style={{
        display:'flex',
        flexDirection:'row'
      }}>
        <PetSubInfoCard pet={pet} 
        icon ={require('./../../assets/images/calendar.png')}
        title={'Age'}
        value={pet?.age+" Years"} /> 
        <PetSubInfoCard pet={pet} icon ={require('./../../assets/images/bone.png')}
        title={'Breed'}
        value={pet?.breed}/>
      </View>

      <View style={{
        display:'flex',
        flexDirection:'row'
      }}>
        <PetSubInfoCard pet={pet} 
        icon ={require('./../../assets/images/sex.png')}
        title={'Sex'}
        value={pet?.sex} /> 
        <PetSubInfoCard pet={pet} icon ={require('./../../assets/images/weight.png')}
        title={'Weight'}
        value={pet?.weight+" kg"}/>
        
        
      </View>
    </View>
  );
}