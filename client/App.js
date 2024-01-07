import React, { useState } from "react";
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Provider from "./context/data";

import FirstPage from "./pages/firstPage";
import { NavigationContainer } from '@react-navigation/native';

// export default function App() {


//     const [showSplash, setShowSplash] = useState(true);

//     const handleSplashScreenEnd = () => {
//       setShowSplash(false);
//     };

//     const SplashScreen = ({ onSplashScreenEnd }) => {
//       useEffect(() => {
//         const timeout = setTimeout(() => {
//           onSplashScreenEnd();
//         }, 4000);

//         // Clear the timeout if the component unmounts
//         return () => clearTimeout(timeout);
//       }, [onSplashScreenEnd]);

//       return (
//         <View style={styles.container}>
//           <Text style={styles.splashText}>Splash Screen</Text>
//         </View>
//       );
//     };

//   return (
//     <Provider>
//     <View style={styles.container}>
//  {showSplash ? (
//   <SplashScreen onSplashScreenEnd={handleSplashScreenEnd} />
// ) : (
// <FirstPage />

// )}
// </View>
//     </Provider>
//   );
// }


export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 4000);


  }, []);

  return (
    <Provider>
      {/* <View style={styles.container}>
        {showSplash ? (
          <View style={styles.splashContainer}>
            <Text style={styles.splashText}>Splash Screen</Text>
          </View>
        ) : (
          <FirstPage />
          )}
      </View> */}
      <FirstPage />
    </Provider>
  );


}

{/* <View style={styles.container}>
  {showSplash ? (
    <View style={styles.splashContainer}>
      <Text style={styles.splashText}>Splash Screen</Text>
    </View>
  ) : (
    <FirstPage />
  )}
</View> */}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Set your desired background color
  },
  splashText: {
    fontSize: 24,
    color: 'white', // Set your desired text color
  },
});