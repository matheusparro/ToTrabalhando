import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { theme } from '../../global/styles/theme';

const CustomHeader = ({ options,back,progress, navigation }: StackHeaderProps) => {
  
  const title  = options?.title;
  const previous = progress.previous
  return (
    <Appbar.Header style={{backgroundColor: theme.color.background}} >
      {previous ? (
        <Appbar.BackAction onPress={() => navigation.pop()} size={24} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer);
          }}>
          <Appbar.Action size={24} icon={'menu'}  />
        </TouchableOpacity>
      )}
      <Appbar.Content  color={theme.color.heading} titleStyle={{ fontSize: 20 }} title={title} />
    </Appbar.Header>
  );
};

export default CustomHeader;
