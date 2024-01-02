import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Search from "../components/Search";
import * as Location from "expo-location";
import { FormContext } from "../context/data";


export default function Home({ navigation }) {
  const { setSonglist, searchQuery, setSearchQuery  } = useContext(FormContext);

  const [weather, setWeather] = useState(null);
  const [holiday, setHoliday] = useState(null);
  const [ganers, setGaners] = useState([
    "Rock",
    "Pop",
    "HipHop",
    "Jazz",
    "Blues",
    "Country",
    "Electronic",
    "Classical",
    "Metal",
    "Funk",
    "Soul",
    "Rap",
    "Mizrahi",
    "Israeli",
  ]);

  const showPosition = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const API_KEY = "82f507439bcd18bdb3e41b067a1564ad";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      const response = await fetch(apiUrl);
      const weatherData = await response.json();
      console.log("Current weather data:", weatherData.weather[0].description);
      setWeather(weatherData.weather[0].description);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const CurrentHoliday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Note: JavaScript months are zero-based
    const day = today.getDate();

    const apiUrl = `https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month}&gd=${day}&g2h=1`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Today's Jewish date:", data.hebrew);
        console.log("Today's Jewish holiday(s):", data.holidays);
        setHoliday(data.holidays);
      })
      .catch((error) =>
        console.error("Error fetching Jewish calendar data:", error)
      );
  };

  useEffect(() => {
    showPosition();
    CurrentHoliday();
  }, []);

  // const findClosestHolidayToHebrewDate = (hebrewDate) => {
  //   const { year, month, day } = hebrewDate;

  //   const apiUrl = `https://www.hebcal.com/converter?cfg=json&hy=${year}&hm=${month}&hd=${day}&g2h=1`;

  //   return fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.error) {
  //         throw new Error(data.error); // Throw an error if Hebcal API returns an error
  //       }

  //       console.log("Converted Gregorian date:", data.gd, data.gm, data.gy);
  //       console.log("Converted Jewish date:", data.hebrew);
  //       console.log("Corresponding Jewish holiday(s):", data.events);
  //       return data.events;
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Error fetching Jewish calendar data:",
  //         error.message || error
  //       );
  //       return [];
  //     });
  // };

  // // Example usage:
  // const hebrewDate = {
  //   year: 5783,
  //   month: 4,
  //   day: 23,
  // };

  // findClosestHolidayToHebrewDate(hebrewDate).then((closestHolidays) => {
  //   console.log(closestHolidays);
  //   if (closestHolidays.length > 0) {
  //     console.log("Closest Jewish holiday(s):", closestHolidays);
  //     // Perform further actions with closestHolidays as needed
  //   } else {
  //     console.log("No holiday found for the given Hebrew date.");
  //   }
  // });

  const fetchSongsByWeather = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.179:3000/api/v1/songs/songByPeriodTag/${weather}`
      );
      const data = await response.json();

      setSonglist(data);
      setPlaylistName(`${weather} Songs`);
      navigation.navigate("Playlist");
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchSongsByHoliday = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.179:3000/api/v1/songs/songByPeriodTag/${holiday}`
      );
      const data = await response.json();

      setSonglist(data);
      setPlaylistName(`${holiday} Songs`);
      navigation.navigate("Playlist");
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectGaner = async (event, item) => {
    event.persist();
    try {
      const res = await fetch(
        `http://192.168.0.179:3000/api/v1/songs/songByGenre/${item}`
      );
      const data = await res.json();
      setPlaylistName(`${item} Songs`);
      setSonglist(data);
      navigation.navigate("Playlist");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const urls = {
    Pop: require("../assets/Pop.jpg"),
    Rock: require("../assets/Rock.jpg"),
    Jazz: require("../assets/Jazz.jpg"),
    HipHop: require("../assets/HipHop.jpg"),
    Country: require("../assets/Country.jpg"),
    Blues: require("../assets/Blues.jpg"),
    Classical: require("../assets/Classical.jpg"),
    Electronic: require("../assets/Electronic.jpg"),
    Funk: require("../assets/Funk.jpg"),
    Metal: require("../assets/Metal.jpg"),
    Rap: require("../assets/Rap.jpg"),
    Soul: require("../assets/Soul.jpg"),
    Israeli: require("../assets/Israeli.jpg"),
    Mizrahi: require("../assets/Mizrahi.jpg"),
  };

  const viewGaners = (item) => {
    return (
      <TouchableOpacity
        key={item}
        style={styles.touchable}
        onPress={(event) => selectGaner(event, item)}
      >
        <ImageBackground
          source={urls[item]}
          style={styles.viewItem}
          resizeMode="cover"
        >
          <Text style={styles.genreText}>
            {item.replace(/([a-z])([A-Z])/g, "$1 $2")}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
       <Search/>
      <Text style={styles.albomsCoteret}>OUR CATEGORIES</Text>

      <View style={styles.item1}>
        <View style={styles.viewItem}>
          <Text onPress={fetchSongsByWeather} style={styles.genreText}>
            Weather- {weather}
          </Text>
        </View>

        <View style={styles.viewItem}>
          <Text onPress={fetchSongsByHoliday} style={styles.genreText}>
            Holiday- {holiday}
          </Text>
        </View>
      </View>

      <FlatList
        numColumns={2}
        data={ganers}
        renderItem={({ item }) => viewGaners(item)}
      />
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  albomsCoteret: {
    paddingLeft: 15,
    fontSize: 20,
  },
  genreText: {
    fontSize: 24,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 5,
    paddingRight: 10,
    paddingLeft: 10,
    color:"white"
  },
  item1: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex:90
  },
  viewItem: {
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 24,
    padding: 10,
    marginHorizontal: 10,
    width: 150,
    height: 100,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  genreImg: {
    // flex: 1,
    borderRadius: 100,
    width: 150,
    height: 100,
  },
  touchable: {
    width: "45%", // Adjust the width as needed for your layout
    aspectRatio: 1, // Maintain aspect ratio or use fixed height/width
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
});
