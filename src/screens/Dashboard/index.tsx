import React, { useCallback, useEffect, useState } from "react";
import {ActivityIndicator} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"

import {useFocusEffect} from "@react-navigation/native"
import {useTheme} from "styled-components"
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
  LogoutButton,
  LoadContainer
} from "./styles"

export interface DataListProps extends TransactionCardProps {
  id: string;
}
interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps; 
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHightlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  function getLastTransactionDate(
    colletion: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
    Math.max.apply(Math, colletion
    .filter(transaction => transaction.type === type)
    .map(transaction => new Date(transaction.date).getTime()
    )));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`;
  }

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

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative')
    const totalInterval = `01 a ${lastTransactionExpensives}`

    const total = entriesTotal - expensiveTotal;

    setHightlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}` 
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval,
      }
    });

    setIsLoading(false);
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
      { isLoading ? 
        <LoadContainer>
          <ActivityIndicator 
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer> :
        <>
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
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
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
      </>
    }
    </Container>
);
}