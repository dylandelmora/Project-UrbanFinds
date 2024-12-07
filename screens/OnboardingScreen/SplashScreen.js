import { View, Text , StyleSheet , Image} from 'react-native'
import React from 'react'

export default function SplashScreen() {
  return (
    <View style= {styles.body}>
      <Image 
      style= {styles.logo}
        source= {require('../../assets/Logo.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({

  body: {
    flex: 1,
    alignItems : 'center',
    backgroundColor : '#08142A',
    justifyContent: 'center',
    
  }, 
  logo: {
    width: 150,
    height: 150,
    margin : 20,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    
  }

})