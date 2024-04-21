import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import useGlobalStore from '@state';
import { BananaMap, NavBar } from '@elements';
import { navigate } from '@util/navigationService';

function MapScreen() {
  const isFocused = useIsFocused();
  const { width, height } = Dimensions.get('window');

  const activeDonationsForClient = useGlobalStore(state => state.activeDonationsForClient);
  const getActiveDonationsForClient = useGlobalStore(state => state.getActiveDonationsForClient);

  const jwt = useGlobalStore(state => state.jwt);
  const user = useGlobalStore(state => state.user);

  const { latitude, longitude } = useGlobalStore(state => {
    if (state.user && state.user.coords) {
      return state.user.coords;
    }
    /* center of seattle */
    return {
      latitude: 47.617004,
      longitude: -122.343506,
    };
  });
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.05;

  // in case of virtual device, the position of client would be center of seattle.
  const [ location ] = useState({
    latitude: latitude || 47.617004,
    longitude: longitude || -122.343506,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
  });

  useEffect(() => {
    if (isFocused && jwt && user) {
      getActiveDonationsForClient(jwt, user);
    }
  }, [ isFocused ]);
  return (
    <View>
      <NavBar
        showBackButton={false}
        showSelector={true}
        onList={() => navigate('ClientDashboardScreen')}
        position="map"
      />
      <BananaMap
        donations={activeDonationsForClient || []}
        mapRegion={location}
        clientLocation={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        markerSize={24}
      />
    </View>
  );
}

export default MapScreen;
