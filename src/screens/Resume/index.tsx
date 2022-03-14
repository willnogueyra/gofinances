import React from "react";
import {HistoryCard} from "../../components/HistoryCard"

import {
  Container,
  Header,
  Title
} from "./styles"

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      
      <HistoryCard 
        title="compras"
        amount="R$ 150,000"
        color="red"
      />

    </Container>
  )
}