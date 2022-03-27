import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import layout from "../../constants/Layout";
import { Text, View } from '../../components/Themed';
import { MonoText } from "../../components/StyledText";
import { RootStackScreenProps } from '../../types';
import { servicesList } from "../../constants/Services";
import { ModalAdd } from '../../components/ModalAdd';

export default function ServicesSection({ navigation }: RootStackScreenProps<'ServicesSection'>) {

  const [entries, setEntries] = useState<any>([]);
  const carouselRef = useRef<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState();

  useEffect(() => {
    setEntries(servicesList);
  }, []);

  const _renderItem = ({ item, index }: any, parallaxProps: any) => {
    return (
      <>
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.image }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <MonoText numberOfLines={2}>{item.subtitle}</MonoText>
        </View>
        <TouchableOpacity
          onPress={() => { setModalVisible(true); setItem(item); }}
          style={{
            backgroundColor: "#ADD8E6",
            borderRadius: 4,
            alignSelf: "center",
            padding: 8,
            marginTop: 50
          }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold"
          }}>Add Booking</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <ModalAdd data={item} modalVisible={modalVisible} setModalVisible={(flag) => setModalVisible(flag)} />
      <Carousel
        ref={carouselRef}
        sliderWidth={layout.window.width}
        sliderHeight={layout.window.width}
        itemWidth={layout.window.width - 60}
        data={entries}
        renderItem={_renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  item: {
    width: layout.window.width - 60,
    height: layout.window.width - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
