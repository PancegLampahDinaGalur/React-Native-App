import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import Constants from "expo-constants";
import { Row, Column } from "@/components/Grid";
import Ionicons from "@expo/vector-icons/Ionicons";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function details() {
  const { id } = useLocalSearchParams();
  const [cars, setCars] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    setLoading(true); //loading state
    const getData = async () => {
      console.log(id);
      try {
        const response = await fetch(
          "https://api-car-rental.binaracademy.org/customer/car/" + id,
          { signal: signal } // UseEffect cleanup
        );
        const body = await response.json();
        setCars(body);
      } catch (e) {
        // Error Handling
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      }
    };
    getData();
    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, [id]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}> {cars.name} </Text>
        <Row gap={5}>
          <Column style={styles.textIcon}>
            <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
            <Text style={styles.capacityText}>{5}</Text>
          </Column>
          <Column style={styles.textIcon}>
            <Ionicons size={14} name={"bag-outline"} color={"#8A8A8A"} />
            <Text style={styles.capacityText}>{4}</Text>
          </Column>
        </Row>
        <Image style={styles.imgCar} source={{ uri: cars.image }} />
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatCurrency.format(cars.price)}</Text>
        <Button color="#3D7B3F" title="Lanjutkan Pembayaran" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flex: 1, // Allow the container to take full height
    alignItems: "center", // Center items horizontally
    // paddingHorizontal: 20,
  },
  titleText: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    // marginBottom: 80, // Add margin to separate text from image
    alignSelf: "center", // Align text to the left
    fontSize: 20,
  },
  imgCar: {
    // marginVertical: 10,
    height: 200,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#EEEEEE",
    position: "fixed",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
  textDesc: {
    padding: 30,
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
  },
  descText: {
    textAlign: "center", // Center the text
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
