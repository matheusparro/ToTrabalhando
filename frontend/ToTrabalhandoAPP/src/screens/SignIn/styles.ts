import {StyleSheet} from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.background,
    marginTop:-50,
  },
  image:{
    width: 175,
    height: 160,
    
  },
  content:{
    marginTop:-10,
    paddingHorizontal:50
  },
  title: {
    color: theme.color.heading,
    textAlign: 'center',
    fontSize:40,
    marginBottom:16,
  },
  subtitle: {
    color: theme.color.heading,
    textAlign: 'center',
    fontSize:15,
    marginBottom:64,
  },
  titleIcon: {
    color: theme.color.heading,
    textAlign: 'center',
    fontSize:50,
    marginBottom:44,

  },
  titleIconTo:{
    color: theme.color.heading,
    textAlign: 'center',
    fontSize:30,
    marginBottom:16,
  },
  inputLogin:{
    backgroundColor: '#C393F2',
    borderBottomColor:'black',
    height: 40,
    color:'#222222',
    paddingHorizontal:15,
    marginBottom:15,
    marginTop:20
  },
  inputPassword:{
    backgroundColor: '#C393F2',
    borderBottomColor:'#222222',
    height: 40,
    paddingHorizontal:15,
    marginBottom:5
  },
  createAccount:{
    color: theme.color.heading,
    marginBottom:30,
  }

  




})