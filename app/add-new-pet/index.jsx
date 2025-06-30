/* to create new pet , the user can add pet for adoption  (when click on the add new pet button the form displays)*/

import { useUser } from '@clerk/clerk-expo';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router, useNavigation } from 'expo-router';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { db } from '../../config/FirebaseConfig';
import Colors from './../../constants/Colors';



export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState(
    {category:'Dogs', sex:'Male'}
  );
  const [gender, setGender] = useState();
  const [categoryList,setCategoryList] = useState([]);
  const [selectedCategory,setSelectedCategory]=useState();
  const [image,setImage]=useState(); 
  const [loader,setLoader]=useState(false);
  const{user}=useUser();



  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Pet'
    })
    GetCategories();

  }, [])

  /* used to get category list from firebase */

  const GetCategories = async () => {
    setCategoryList([])
    const snapshot = await getDocs(collection(db, 'Category'));
    snapshot.forEach((doc) => {
      setCategoryList(categoryList => [...categoryList, doc.data()])
    })
  }
/* to get image from user*/
/*used to get image from gallery*/
  
  const imagePicker=async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

  }

  /* to accept input in form */
  const handleInputChanges = (fieldName, fieldValue) => {
    //console.log(fieldName,fieldValue) -- to print 
    //al the user entering details will be saved inside the form
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))

  }
const onsubmit = async () => {
  console.log("🚀 Submit button clicked");

  if (Object.keys(formData).length !== 8 || !image) {
    ToastAndroid.show('Enter All Details', ToastAndroid.SHORT);
    return;
  }

  try {
    // Upload image to Cloudinary
    const imageUrl = await uploadToCloudinary(image);
    console.log("✅ Image uploaded:", imageUrl);

    // Save form data with the uploaded image URL
    await SaveFormData(imageUrl);

  } catch (error) {
    console.error('❌ Error during submission:', error);
    ToastAndroid.show('Submission Failed', ToastAndroid.SHORT);
  }
};
  /*used to upload pet image to firebase storage (server)*/

  const uploadToCloudinary = async (localUri) => {
    setLoader(true)
  const data = new FormData();

  data.append('file', {
    uri: localUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });
  data.append('upload_preset', 'petform'); // your Cloudinary upload preset
  data.append('cloud_name', 'djwjiqhgm'); // your Cloudinary cloud name

  const res = await fetch('https://api.cloudinary.com/v1_1/djwjiqhgm/image/upload', {
    method: 'POST',
    body: data,
  });

  const result = await res.json();
  return result.secure_url;
};

const SaveFormData = async (imageUrl) => {
  try {
    const docId = Date.now().toString();
    const petData = {
      ...formData,
      imageUrl,
      username: user?.fullName || 'Anonymous',
      email: user?.primaryEmailAddress?.emailAddress || 'unknown@example.com',
      userImage: user?.imageUrl || '',
      id: docId,
    };

    console.log("🔥 Saving data to Firestore:", petData);

    await setDoc(doc(db, 'Pets', docId), petData); // 🔥 Failing here?

    ToastAndroid.show('✅ Pet Added Successfully!', ToastAndroid.SHORT);
    setLoader(false);

    router.replace('/(tabs)/home')

    // Reset form
    setFormData({ category: 'Dogs', sex: 'Male' });
    setImage(null);
    setSelectedCategory(null);
    setGender(null);

  } catch (error) {
    console.error('❌ Firestore Save Error:', error.message, error.stack);
    ToastAndroid.show('❌ Failed to save pet data', ToastAndroid.LONG);
  }
};
  return (
    <ScrollView style={{
      padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20
      }}> Add New Pet for Adoption </Text>

      <Pressable onPress={imagePicker}> 
        {!image? <Image source={require('./../../assets/images/placeholder.jpeg')}
          style={{
            width: 100,
            height: 100,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.GRAY
          }}
        />:
        <Image source ={{uri:image}}
        style={{
            width: 100,
            height: 100,
            borderRadius: 15,
            
          }}/>}
      </Pressable>

      {/*pet name*/}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput style={styles.input}
          onChangeText={(value) => handleInputChanges('name', value)} />
      </View>
      
      {/*pet category*/}

      <View style={styles.inputContainer}>
          <Text style={styles.label}>Pet Category *</Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.genderPicker}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCategory(itemValue);
              handleInputChanges('category', itemValue)
            }}>
              {categoryList.map((category,index)=>(
                <Picker.Item key={index} label={category.name} value={category.name} />
              ))} 
          </Picker>
      </View>

      {/*pet breed*/}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput style={styles.input}
          onChangeText={(value) => handleInputChanges('breed', value)} />
      </View>

      {/*pet age*/}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput style={styles.input}
         keyboardType='number-pad'
          onChangeText={(value) => handleInputChanges('age', value)} />
      </View>

      {/*pet gender*/}

      <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender *</Text>
          <Picker
            selectedValue={gender}
            style={styles.genderPicker}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
              handleInputChanges('sex', itemValue)

            }}
          >
            <Picker.Item label="Select Gender" value="" enabled={false} />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
      </View>

      {/*pet weight*/}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput style={styles.input}
            keyboardType='number-pad'
          onChangeText={(value) => handleInputChanges('weight', value)} />
      </View>

      {/*pet Address*/}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput style={styles.input}
          onChangeText={(value) => handleInputChanges('address', value)} />
      </View>

      {/*pet About*/}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput style={styles.input}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChanges('about', value)} />
      </View>

      <TouchableOpacity 
      style={styles.button} 
      disabled={loader}
      onPress={onsubmit}>
        {loader?<ActivityIndicator size={'large'}/>:
        <Text style={{ fontFamily: 'outfit-medium', textAlign: 'center' }}>Submit</Text>
}
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: 'outfit'
  },
  label: {
    marginVertical: 5,
    fontFamily: 'outfit'
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom:100
  },
  genderPicker: {

    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: 'outfit'
  },


})