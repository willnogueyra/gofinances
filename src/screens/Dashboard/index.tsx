import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

import {useFocusEffect} from "@react-navigation/native"

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
interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps; 
  total: HighlightProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHightlightData] = useState<HighlightData>({} as HighlightData);

  async function loadTransactions() {
    const dataKey = '@gofinances:trsansactions';
    const responseTransactions = await AsyncStorage.getItem(dataKey)
    const transactions = responseTransactions ? JSON.parse(responseTransactions) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      if(item.type === "positive") {
        entriesTotal += Number(item.amount)
      } else {
        expensiveTotal += Number(item.amount)
      }

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

    setTransactions(transactionsFormatted);

    const total = entriesTotal - expensiveTotal;

    setHightlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })
  }

  useEffect(() => {
    loadTransactions();

    /* Remover transactions
      const dataKey = '@gofinances:trsansactions';
      AsyncStorage.removeItem(dataKey);
    */
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

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
          amount={highlightData.entries.amount}
          lastTransaction="Última entrada dia 13 de Abril de 2020"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.expensives.amount}
          lastTransaction="Última entrada dia 03 de Abril de 2020"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction="Última entrada dia 7 de Abril de 2020"
        />
      </HighlightCards >

      <Transactions>
        <Title>
          Listagem
        </Title>

        <TransactionList 
          data={transactions} 
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item} />}
          
        />
      </Transactions>
    </Container>
);
}