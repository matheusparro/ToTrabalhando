import {StyleSheet} from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({

  input:{
    backgroundColor: '#C393F2',
    borderBottomColor:'black',
    height: 45,
    color:'#222222',
    paddingHorizontal:15,
    marginBottom:15,
    marginTop:8,
    width:"100%",
    
  },
  title: {
    color: theme.color.heading,
    textAlign: 'center',
    fontSize:24,
    marginBottom:16,
  },
  titleLabel: {
    color: theme.color.heading,
  },
})