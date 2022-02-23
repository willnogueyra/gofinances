import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage"

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
  const [data, setData] = useState<DataListProps[]>([])

  async function loadTransactions() {
    const dataKey = '@gofinances:trsansactions';
    const responseTransactions = await AsyncStorage.getItem(dataKey)
    const transactions = responseTransactions ? JSON.parse(responseTransactions) : [];

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount: amount,
        type: item.type,
        category: item.category,
        date: date,
      }
    });

    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, [])

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