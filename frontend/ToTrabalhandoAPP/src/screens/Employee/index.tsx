import React, { useContext, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { styles } from './styles'
import { ButtonIcon } from '../../components/ButtonIcon';
import { theme } from '../../global/styles/theme'
import {useAuth} from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

export function Employee() {

  const styles2 = StyleSheet.create({
    fab: {
      position: 'absolute',
      marginRight: 16,
      right: 0,
      bottom: 30,
    },
  })
 const { signOut } = useAuth()
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View >
        <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
        </View>
      
      </View>
      <FAB
    style={styles2.fab}
    small
    icon="plus"
    onPress={() =>  navigation.navigate("EmloyeeInsert" as never, {} as never)}
  />
    </View>
  );

}
