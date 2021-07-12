import React, { useState } from 'react';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../../components/Form/CategorySelect';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles'


export function Register() {
  const [transactionTpe, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="nome" />
          <Input placeholder="preço" />
          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionTpe === 'up' }
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionTpe === 'down' }
            />
          </TransactionTypes>
          <CategorySelect title="categoria" />
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
