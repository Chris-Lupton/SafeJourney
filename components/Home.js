import { View, Text} from "react-native"
import { appStyle } from "../styles/appStyle"
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState,useContext} from "react";
import { getLocation } from "../utils/getLocation";
import { UserContext} from "../context/userContext";
import { FriendContext } from "../context/friendContext";



export const Home = () => {
    const{userData,setUserData} = useContext(UserContext)
    const{friendData,setFriendData}=useContext(FriendContext)

    const [whosJourney, setWhosJourney] = useState("user")

    const [region, setRegion] = useState(null);
    useEffect(()=>{
        setFriendData((friendData)=>{
            const newData = {...friendData}
            newData.currentLocation = {
                latitude: 52.57559667266577,
                longitude:-0.25841876864433294
            }
            return newData;
            
       })
       
  },[])
  
    useEffect(()=>{
        setRegion({
            latitude: friendData.currentLocation.latitude,
            longitude: friendData.currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,

        })
        setWhosJourney((whosJourney)=>{
            
           return whosJourney === "friend"? "user":"friend"
        })
    },[friendData])

    useEffect(()=>{
        getLocation()
        .then(( {latitude,longitude})=>{
            
            
           setUserData((userData)=>{
                const newData = {...userData}
                newData.currentLocation = {
                    latitude: latitude,
                    longitude:longitude
                }
                return newData;
            })
            if(whosJourney === "user"){
                setRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,

                })
            }
        }
        )
      },[])

    return (
        <View style={appStyle.container}>
            <MapView
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          style={appStyle.map}
          region={region}
          onRegionChange={() => {
            setRegion((region) => {
            return  whosJourney === "user"?
              {
                latitude:userData.currentLocation.latitude,
                longitude:userData.currentLocation.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }:
              {
                latitude:friendData.currentLocation.latitude,
                longitude:friendData.currentLocation.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            });
          }}
        //   onPress={handlePress}
          showsPointsOfInterest={true}
          showsUserLocation={true}
        >
        {/* {destination&&<Marker coordinate={destination}/> } */}
        
        </MapView>
        <Text style={appStyle.nameText}>{userData.name}</Text>
        </View>
    )
}