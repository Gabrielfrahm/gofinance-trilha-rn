import React from 'react';

import {
  Container,
  Title,
  Amount
} from './styles';

interface historyCardProps {
  color: string;
  amount: string;
  title: string;
}

export function HistoryCard({
  amount,
  color,
  title,
} : historyCardProps){
  return(
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}
