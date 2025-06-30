/* as the fav should be used in many page so creating separate page for that. if clicked fav it will be marked as fav in that particular user database and again clicked it will be removed from fav*/
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Shared from './../Shared/Shared';

export default function MarkFav({pet,color='black'}) {

 
    const { user } = useUser();
    const [favList, setFavList] = useState();
    useEffect(() => {
        user && GetFav();

    }, [user])

    const GetFav = async () => {
        const result = await Shared.GetFavList(user);
        console.log(result);
        setFavList(result?.favorites ? result?.favorites : [])
    }

    const AddToFav=async()=>{
        const favResult=favList;
        favResult.push(pet?.id)
        console.log(pet.id)
        await Shared.UpdateFav(user,favResult);
        GetFav();
    }
/* to remove fav */
    const removeFromFav=async()=>{
        const favResult=favList.filter(item=>item!=pet.id);
        await Shared.UpdateFav(user,favResult);
        GetFav();
    }

/* to add fav , if fav clickedit turns red then again clicked turns to normal black outline*/
    return (
        <View>
        {favList?.includes(pet.id)? <Pressable onPress={removeFromFav}>
            <Ionicons name="heart" size={30} color="red" />
        </Pressable>:
        <Pressable onPress={()=>AddToFav()}> 
            <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>}
        </View>
    )
}