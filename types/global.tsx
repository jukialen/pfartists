import { StyleSheet } from 'react-native';


export const global__styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '40%',
      backgroundColor: 'red'
    },
  });

  export const dark__mode = StyleSheet.create({
      text: {
       color: '#fff', 
      },

      container: {
        backgroundColor: "#000"
      }
  })
  
  export const light__mode = StyleSheet.create({
    text: {
     color: '#000', 
    },

    container: {
      backgroundColor: "#fff"
    }
})