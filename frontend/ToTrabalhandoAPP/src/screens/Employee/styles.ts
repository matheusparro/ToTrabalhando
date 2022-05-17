import {StyleSheet} from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.color.background,
 
  },

  content:{
    marginTop:30,
    paddingHorizontal:50,
    width:"100%"
  },
  teste:{
    color:theme.color.heading,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  
  

})