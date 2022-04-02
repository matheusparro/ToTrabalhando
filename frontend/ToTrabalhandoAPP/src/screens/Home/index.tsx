import React, { useContext, useState } from 'react';
import { Text, View, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { styles } from './styles'
import IllustrationImg from '../../assets/illustration2.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { theme } from '../../global/styles/theme'
import { UserContext } from '../../contexts/UserContext/userContext';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from "react-native";
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export function Home() {


  const { user } = useContext(UserContext)
  const navigation = useNavigation()
  const screenWidth = Dimensions.get("window").width;
  const state = {
    data: [
      { id: "01", name: "1°Ponto" },
      { id: "02", name: "2°Ponto" },
      { id: "03", name: "3°Ponto" },
      { id: "04", name: "4°Ponto" }
    ]
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={{ color: theme.color.heading }}>Grafíco de Horas Trabalhadas por mês</Text>
        <View style={{ marginBottom: 20 }}>
          <LineChart
            data={{
              labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
              datasets: [
                {
                  data: [
                    100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={screenWidth - 20} // from react-native
            height={220}
            yAxisInterval={1}
            // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#5A17AC",
              backgroundGradientFrom: "#CA5AF0",
              backgroundGradientTo: "#69146D",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,

              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#FF26BE"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>

        <Text style={{ color: theme.color.heading, marginBottom: 20 }}>Dia de Hoje 01/04/2022</Text>
        <View style={{ marginBottom: 20 }}>
          <DataTable  >
            <DataTable.Header  >
              <DataTable.Title theme={{ colors: { text: '#ffff' } }} >1°Ponto</DataTable.Title>
              <DataTable.Title theme={{ colors: { text: '#ffff' } }}>2°Ponto</DataTable.Title>
              <DataTable.Title theme={{ colors: { text: '#ffff' } }}>3°Ponto</DataTable.Title>
              <DataTable.Title theme={{ colors: { text: '#ffff', } }}>4°Ponto</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row style={{height: 40, backgroundColor: '#9C14C2'}}>
              <DataTable.Cell theme={{ colors: { text: '#ffff', } }}>08:00</DataTable.Cell>
              <DataTable.Cell theme={{ colors: { text: '#ffff', } }}>12:00</DataTable.Cell>
              <DataTable.Cell theme={{ colors: { text: '#ffff', } }}>13:12</DataTable.Cell>
              <DataTable.Cell theme={{ colors: { text: '#ffff', } }}>18:00</DataTable.Cell>
            </DataTable.Row>

           

          </DataTable>
        </View>
        <View >
          <ButtonIcon color={theme.color.primary} title='Bater Ponto' activeOpacity={0.8} />
        </View>
      </View>
    </View>
  );

}
