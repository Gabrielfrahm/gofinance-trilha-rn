import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Input } from '../Input';
import { Container, Error } from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputForm({ control, name, error, ...rest  }: Props) {
  return (
    <Container>
      <Controller
        // quem esta controlando o input, no caso qual formulário
        control={control}
        // qual input que vai ser controlado
        render={({ field: { onChange, value } }) => (
          <Input
          onChangeText={onChange}
          value={value}
            {...rest}
          />
        )}
        name={name}
      />
      {error &&  <Error>{error}</Error>}
    </Container>
  )
}
