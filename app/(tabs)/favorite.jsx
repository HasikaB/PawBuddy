/* the favorite page next to home where the pets that are made favorites will be listed here (like whishlist )*/

import { useUser } from '@clerk/clerk-expo';
import { useIsFocused } from '@react-navigation/native'; // ✅ Import this
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import PetListItem from '../../components/Home/PetListItem';
import { db } from '../../config/FirebaseConfig';
import Shared from '../../Shared/Shared';

export default function Favorite() {

    /* fetching user fav pet*/
  const { user } = useUser();
  const isFocused = useIsFocused(); // ✅ Detect screen focus
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  // ✅ Refetch every time the screen is focused
  useEffect(() => {
    if (user && isFocused) {
      GetFavPetIds();
    }
  }, [user, isFocused]);

    //Fav ids
  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    const ids = result?.favorites || [];
    setFavIds(ids);
    if (ids.length === 0) {
      setFavPetList([]);
      setLoader(false);
      return;
    }
    await GetFavPetList(ids);
    setLoader(false);
  };

    //Fetch Related Pet List
  const GetFavPetList = async (ids) => {
    setFavPetList([]);
    if (!ids || ids.length === 0) return;

    const q = query(collection(db, 'Pets'), where('id', 'in', ids));
    const querySnapshot = await getDocs(q);

    const pets = [];
    querySnapshot.forEach((doc) => {
      pets.push(doc.data());
    });

    setFavPetList(pets);
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>Favorites</Text>

      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
}