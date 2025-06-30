import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { db } from '../../config/FirebaseConfig';
import Category from './Category';
import PetListItem from './PetListItem';


export default function PetListByCategory() {

    const [petList, setPetList]=useState([]);
    const [loader,setLoader]=useState(false);


   /* at first default shows dog details first */

    useEffect(()=>{
        GetPetList('Dogs')
    },[])

    /* used to get pet list on selecting the category*/
    const GetPetList=async(category)=>{
        setLoader(true)
        setPetList([]);
        const q=query(collection(db,'Pets'),where('category','==',category));
        const querySnapshot =await getDocs(q);

        querySnapshot.forEach(doc=>{ 
            setPetList(petList=>[...petList,doc.data()])
        })
        setLoader(false);

    }

  return (
    <View>
      <Category category={(value)=>GetPetList(value)}/> 
        
        {/* to display pet list*/}
      <FlatList
        data={petList}
        style={{marginTop:10}}
        horizontal={true}
        /*to show loading when switching between pet category*/
        refreshing={loader} 
        onRefresh={()=>GetPetList('Dogs')}
        renderItem={({item,index})=>(
          
            <PetListItem pet={item}/>
           

        )}
      
      />

             
    </View>
  ) 
}