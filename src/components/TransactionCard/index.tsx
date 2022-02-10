import react from 'react';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from "./styles"

export function TransactionCard() {
  return (
    <Container>
      <Title>Desenvolvimento de Site</Title>

      <Amount>R$ 12,000,00</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign"></Icon>
          <CategoryName>Vendas</CategoryName>
        </Category>

        <Date>12 de outubro de 2021</Date>
      </Footer>
    </Container>
  )
}