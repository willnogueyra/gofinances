import React from "react"
import { 
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
 } from "./styles"

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Footer>
        <Amount>R$ 17.600.00</Amount>
        <LastTransaction>Ultima transação Dia 04/10/2021</LastTransaction>
      </Footer>
    </Container>
  );
}