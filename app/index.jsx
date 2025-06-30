/*main index page*/

import { useUser } from '@clerk/clerk-expo';
import { Redirect, useNavigationContainerRef } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, isLoaded } = useUser();
  const [navReady, setNavReady] = useState(false);

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const checkNavReady = setInterval(() => {
      if (navigationRef.isReady()) {
        setNavReady(true);
        clearInterval(checkNavReady);
      }
    }, 100);
    return () => clearInterval(checkNavReady);
  }, [navigationRef]);

  if (!isLoaded || !navReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href="/(tabs)/home" /> : <Redirect href="/login" />}
    </View>
  );
}
