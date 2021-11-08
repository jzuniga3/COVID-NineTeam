import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default function Add({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if(image != null) {
      navigation.navigate('Save', {image});
    }
  }, [image])

  const takePicture = async () => {
      if(camera) {
          const data = await camera.takePictureAsync(null);
          setImage(data.uri);
      }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'} />
      </View>
      
      <View style={{ flex: 1, flexDirection:'row', justifyContent: 'space-evenly', 
      // change this back to flex eventually
      position: 'absolute', bottom: 0, marginLeft: 0, marginBottom: 10 }}>
      <Button
        title="Flip Image"
        
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
      </Button>
      <Button title="Take Picture" style={styles.buttonStyle} onPress={() => takePicture()}/>
      <Button title="From Gallery" style={styles.buttonStyle} onPress={() => pickImage()}/>
      <Button title="Barcode" style={styles.buttonStyle} onPress={() => navigation.navigate('BarcodeScreen')}/>
      {/* <Button title="Save" onPress={() => navigation.navigate('Save', {image})}/> */}
      </View>
      {/* {image && <Image source={{uri: image}} style={{flex: 1}}/>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 2 / 3
  },
  buttonStyle: {
    width: '25%'
  }
})