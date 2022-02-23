import React, { useEffect, useState } from "react";
import { 
  Alert, 
  Keyboard, 
  Modal, 
  TouchableWithoutFeedback 
} from "react-native";

import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import AsyncStorage from "@react-native-async-storage/async-storage"
import uuid from "react-native-uuid";

import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native"
import { useForm } from "react-hook-form";

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import {CategorySelect} from "../CategorySelect"

import {
  Container, 
  Header, 
  Title,
  Form,
  Fields,
  TransactionType
} from "./styles"

interface FormData {
  name: string,
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é o obrigatorio'),
  amount: Yup.number().typeError('Informe um valor númerico')
  .positive('O valor não pode ser negativo')
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const dataKey = '@gofinances:trsansactions';

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  })

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();


  const {
    reset,
    control,
    handleSubmit,
    formState : { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  type FormData = {
    [name: string]: any;
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if (category.key === 'category') 
      return Alert.alert('Selecione a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('')
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar")
    }
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey)
      console.log((JSON.parse(data!)))
    }

    loadData();

    /* função para limpar o AsyncStorage em casos de erros etc.
      async function removeAll() {
        await AsyncStorage.removeItem(dataKey)
      }

      removeAll() 
    */
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container >
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm 
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm 
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
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

            <CategorySelectButton 
              onPress={handleOpenSelectCategoryModal} 
              title={category.name}
            />
          </Fields>

          <Button 
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />    
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category={category}
            closeSelectCategory={handleCloseSelectCategoryModal}
            setCategory={setCategory}
          />
        </Modal>
        
      </Container >
    </TouchableWithoutFeedback>
  );
}