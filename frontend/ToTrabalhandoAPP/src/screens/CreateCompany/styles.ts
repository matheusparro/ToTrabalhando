import {StyleSheet} from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.color.background,
    
  },
  content:{
    marginTop:50,
    paddingHorizontal:50,
    width:"100%",
  },
  input:{
    backgroundColor: '#C393F2',
    borderBottomColor:'black',
    height: 40,
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
  
  buttonContainer: {
    width: '100%',
    height: 56,
    backgroundColor: theme.color.primary,
    borderRadius:8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTitle: {
    flex:1,
    color: theme.color.heading,
    fontSize: 15,
    textAlign: 'center'
  },
  buttonIconWrapper: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  buttonIcon:{
    width: 24,
    height: 18,
  },
})