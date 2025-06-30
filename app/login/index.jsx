import { useAuth, useSSO } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Colors from './../../constants/Colors';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO()
  const { isLoaded, isSignedIn } = useAuth();

const onPress = useCallback(async () => {
  if (!isLoaded) return;

  if (isSignedIn) {
    // Already signed in, navigate to home or show a message
    router.replace('/home');
    return;
  }

  try {
    const { createdSessionId, setActive } = await startSSOFlow({
      strategy: 'oauth_google',
      redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'petadoptionapp' }),
    });

    if (createdSessionId) {
      await setActive({ session: createdSessionId });
      router.replace('/(tabs)/home');
    }
  } catch (err) {
    console.error("SSO Error:", JSON.stringify(err, null, 2));
  }
}, [isLoaded, isSignedIn]);


  if (!isLoaded) return null; // Prevent showing anything until Clerk is ready

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <Image source={require('./../../assets/images/login1.jpg')}
        style={{ width: '100%', height: 500 }} />
      <View style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, textAlign: 'center' }}>
          Ready to make a new friend?
        </Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 18,
          textAlign: 'center',
          color: Colors.GRAY
        }}>
          Adopt the love of your life — one paw at a time.
        </Text>
      </View>

      <Pressable
        onPress={onPress}
        style={{
          padding: 14,
          marginTop: 100,
          backgroundColor: Colors.PRIMARY,
          width: '90%',
          borderRadius: 14,
          alignItems: 'center',
          alignSelf: 'center'
        }}>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 20,
          textAlign: 'center'
        }}>
          Get Started
        </Text>
      </Pressable>
    </View>
  );
}
