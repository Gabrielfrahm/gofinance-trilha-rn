import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';
import {
  Container,
  Header,
  Title
} from './styles';

export function Resume() {

  async function loadData() {
    const dataKey = '@gofinances:transaction';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];
    console.log(responseFormatted)
  }

  useEffect(() => {
    loadData();
  }, [])
  return (
    <Container>
      <Header>
        <Title>Resume por categoria</Title>
      </Header>

      <HistoryCard
        title="compra"
        amount="R$ 150,00"
        color="red"
      />
    </Container>
  )
}
