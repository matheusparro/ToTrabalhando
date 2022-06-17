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
    paddingHorizontal:30,
    width:"100%"
  },
  contentList:{
    marginTop:30,
    width:"100%"
  },
  teste:{
    color:theme.color.heading,
  },
  item: {
    
    fontSize: 20,
    height: 100,
    marginTop:2,
    paddingLeft:20,
    color:theme.color.heading,
    backgroundColor: '#4E1786',
    textAlignVertical:'center',
    
   
  },
  input:{
    backgroundColor: '#C393F2',
    borderBottomColor:'black',
   
    color:'#222222',
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