import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

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
  Title,
  LogoutButton
} from "./styles"

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    { 
      id: '1',
      type: 'positive',
      title : "Desenvolvimeto de Site",
      amount : "R$ 1222",
      category: {
        name: 'vendas',
        icon: 'dollar-sign'
      },
      date: "12/02/2021"
    },
    {
      id: '2',
      type: 'negative',
      title : "Hamburgueria pixy",
      amount : "R$ 53,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: "12/02/2021"
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel de Apartamento",
      amount : "R$ 13,00",
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
        
        <GestureHandlerRootView>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </GestureHandlerRootView>
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
        keyExtractor={item => item.id}
        renderItem={({item}) => <TransactionCard data={item} />}
        
      />
    </Transactions>
  </Container>
);
}