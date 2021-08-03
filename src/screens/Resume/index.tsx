import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';

import {
  Container,
  Header,
  Title,
  Content,
  MonthSelect,
  MonthSelectButton,
  MonthSelectSelectIcon,
  Month,
  ChartContainer,
  LoaderContainer,
} from './styles';




interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryTotal {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percentage: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryTotal[]>([]);

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = '@gofinances:transaction';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensive = responseFormatted.filter((expensive: TransactionData) =>
      expensive.type === 'negative' &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear() &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth()
    );

    const expensiveTotal = expensive.reduce((acc: number, expensive: TransactionData) => {
      return acc + Number(expensive.amount)
    }, 0);

    const totalByCategory: CategoryTotal[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensive.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        const percentage = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted,
          color: category.color,
          percentage
        })
      }
    });
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  //sempre que tiver o foco executa.
  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resume por categoria</Title>
      </Header>
      {isLoading ?
        <LoaderContainer>
          <ActivityIndicator color={theme.colors.primary} size='large' />
        </LoaderContainer>
        :

        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectSelectIcon name="chevron-left"  />
            </MonthSelectButton>

            <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectSelectIcon name="chevron-right"  />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                }
              }}
              labelRadius={50}
              x="percentage"
              y="total"
            />
          </ChartContainer>

          {
            totalByCategories.map(item => (
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            ))
          }
        </Content>

      }
    </Container>
  )
}
