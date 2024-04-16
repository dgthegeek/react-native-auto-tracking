import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { StackParams } from '../App';
import MapMarker from '../components/MapMarker';
import VehicleCard from '../components/VehicleCard';
import { messageText } from '../data/message';
import { VehicleCategory } from '../types/vehicle';


type VehicleScreenRouteProp = RouteProp<StackParams, 'VehicleScreen'>;

type VehicleScreenProps = {
  route: VehicleScreenRouteProp;
};

const VehicleScreen = ({ route }: VehicleScreenProps) => {
  const { vehicle } = route.params;

  const handleCallDriver = () => {
    Linking.openURL(`tel:${vehicle.contactNumber}`);
  };

  const handleSendMessage = () => {
    const message = encodeURIComponent(messageText);
    Linking.openURL(`whatsapp://send?text=${message}&phone=${vehicle.contactNumber}`);
  };

  const getMarkerIcon = (category: VehicleCategory): string => {
    switch (category) {
      case VehicleCategory.Cargo:
        return 'truck';
      case VehicleCategory.Passenger:
        return 'bus';
      case VehicleCategory.Special:
        return 'car-sports';
      default:
        return '';
    }
  };

  return (
    <View style={styles.listContainer}>
      <VehicleCard vehicle={vehicle} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 20 }}>
        <Pressable style={styles.button} onPress={handleCallDriver}>
          <Text style={styles.buttonText}>Позвонить</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Написать</Text>
        </Pressable>
      </View>
      <MapView style={styles.mapView}
        initialRegion={{
          latitude: 55.751244,
          longitude: 37.618423,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapMarker vehicle={vehicle} />
      </MapView>
    </View>

  );
};

export default VehicleScreen;

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  listItemContainer: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  listItemText: {
    fontSize: 16,
    color: '#000000',
  },
  mapView: {
    height: '50%',
    width: '80%',
    borderRadius: 2,
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});