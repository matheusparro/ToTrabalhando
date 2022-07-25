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
  item2: {
    
    fontSize: 20,
    height: 100,
    marginTop:2,
    paddingLeft:20,
    color:theme.color.heading,
    backgroundColor: '#4E1786',
    justifyContent:"center"    
   
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
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:'#D8D9E3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    padding: 1,
    backgroundColor:"#8B8B8B",
    width:300,
    height:50
  },
})