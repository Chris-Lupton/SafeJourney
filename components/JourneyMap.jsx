// require('dotenv').config({path: `${__dirname}/../.env.development`})

import { appStyle } from "../styles/appStyle";
import MapView from 'react-native-maps'
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { FriendContext } from "../context/friendContext";
import{Marker} from 'react-native-maps'
import{API_KEY} from '@env'

export default function JourneyMap({region,data,setRegion}){
  const{userData}=useContext(UserContext)
  const {friendData}=useContext(FriendContext)
  const GOOGLE_MAPS_APIKEY = API_KEY;

    return(
      
        <MapView
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        style={appStyle.map}
        region={region}
        onRegionChange={() => {
          setRegion(region)
         
        }}
        // onPress={handlePress}
        showsPointsOfInterest={true}
        showsUserLocation={true}
      >{data.location.status &&
        <>
        <Marker coordinate={{latitude: data.location.start.lat, longitude: data.location.start.long}}/> 
        <Marker coordinate={{latitude: data.location.end.lat, longitude: data.location.end.long}}/>
        </>}

     {data.location.status && 
     <MapViewDirections
      origin={data.location.start}
      destination={data.location.end}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
    strokeColor="hotpink"
  />}
      </MapView>
     
    )
}