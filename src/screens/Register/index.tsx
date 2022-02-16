import React, { useState } from "react"

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../../components/Form/CategorySelect";

import {
  Container, 
  Header, 
  Title,
  Form,
  Fields,
  TransactionType
} from "./styles"



export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type)
  }

  return (
    <Container >
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input 
            placeholder="Nome"
          />
          <Input 
            placeholder="Preço"
          />
          <TransactionType>
            <TransactionTypeButton 
              type="up" 
              title="Income" 
              onPress={() => handleTransactionsTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton 
              type="down" 
              title="Outcome" 
              onPress={() => handleTransactionsTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionType>

          <CategorySelect title="Categoria"/>
        </Fields>

        <Button title="Enviar"/>    
      </Form>
      
    </Container >
  );
}