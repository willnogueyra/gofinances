import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  TransactionList,
  Title
} from "./styles"

export function Dashboard() {
  const data = [
    {
      type: 'positive',
      title : "Desenvolvimeto de Site",
      amount : "1222",
      category: {
        name: 'vendas',
        icon: 'dollar-sign'
      },
      date: "12/02/2021"
    },
    {
      type: 'negative',
      title : "Hamburgueria pixy",
      amount : "53,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: "12/02/2021"
    },
    {
      type: 'negative',
      title: "Aluguel de Apartamento",
      amount : "13,00",
      category: {
        name: 'vendas',
        icon: 'shopping-bag'
      },
      date: "12/02/2021"
    }
]

return (
  <Container>
    <Header>
      <UserWrapper>
        <UserInfo>
          <Photo source={{ uri: "https://lh3.googleusercontent.com/ogw/ADea4I6psjVrUGc0qu_MrjzFVdn01mC8uJjGIyw5dlw8Yw=s83-c-mo" }} />
          <User>
            <UserGreeting>Olá,</UserGreeting>
            <UserName>Rodrigo</UserName>
          </User>
        </UserInfo>
        <Icon name="power" />
      </UserWrapper>
    </Header>

    <HighlightCards>
      <HighlightCard
        type="up"
        title="Entradas"
        amount="R$ 17.000.00"
        lastTransaction="Última entrada dia 13 de Abril de 2020"
      />
      <HighlightCard
        type="down"
        title="Saídas"
        amount="R$ 16.600.00"
        lastTransaction="Última entrada dia 03 de Abril de 2020"
      />
      <HighlightCard
        type="total"
        title="Total"
        amount="R$ 13.200.00"
        lastTransaction="Última entrada dia 7 de Abril de 2020"
      />
    </HighlightCards >

    <Transactions>
      <Title>
        Listagem
      </Title>

      <TransactionList 
        data={data} 
        renderItem={({item}) => <TransactionCard data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: getBottomSpace()
        }}
      />
    </Transactions>
  </Container>
);
}