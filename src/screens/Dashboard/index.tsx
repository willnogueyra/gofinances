import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

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
  HighlightCards
} from "./styles"

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: "https://lh3.googleusercontent.com/ogw/ADea4I6psjVrUGc0qu_MrjzFVdn01mC8uJjGIyw5dlw8Yw=s83-c-mo"}}/>
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
    </Container>
  );
}