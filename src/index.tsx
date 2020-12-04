import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import React, {useCallback, useRef} from 'react';
import {Alert} from 'react-native';
import Button from './components/Button';
import ContentScrollView from './components/ContentScrollView';
import Input from './components/Input';
import Space from './components/Space';

interface FormData {
  name: string;
  email: string;
}

const AppContent = () => {
  const formRef = useRef<FormHandles>(null);

  // const INIT = {name: 'ade', email: 'aa@aa.com'};
  const INIT = {};

  function handleSubmit(data: FormData) {
    const cellphoneField = formRef.current?.getFieldValue('cellphone');

    Alert.alert(
      'Result',
      'data: ' +
        JSON.stringify(data) +
        '\nget cellphone field: ' +
        cellphoneField,
    );
  }

  const setFocus = useCallback((field: string) => {
    formRef.current?.getFieldRef(field).focus();
  }, []);

  return (
    <ContentScrollView>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={INIT}>
        <Input
          formRef={formRef}
          name="name"
          label="Nome do responsável*"
          autoCorrect={false}
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('email')}
        />
        <Space />

        <Input
          formRef={formRef}
          name="email"
          label="E-mail (contato)*"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('cellphone')}
          keyboardType="email-address"
        />
        <Space />

        <Input
          formRef={formRef}
          name="cellphone"
          label="DDD + Celular*"
          autoCorrect={false}
          autoCapitalize="none"
          maxLength={15}
          keyboardType="phone-pad"
          type="cel-phone"
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          returnKeyType="done"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />
        <Space />

        <Button
          onPress={() => formRef.current?.submitForm()}
          label="Submit form"
        />
        <Space />

        <Button
          onPress={() =>
            formRef.current?.setFieldValue('cellphone', '19991076565')
          }
          label="Set cellphone"
        />
        <Space />

        <Button
          onPress={() => formRef.current?.getFieldRef('email').focus()}
          label="Email focus"
        />
        <Space />

        <Button
          onPress={() => formRef.current?.clearField('email')}
          label="Clear email"
        />
        <Space />

        <Button onPress={() => formRef.current?.reset()} label="Reset form" />
        <Space />

        <Button
          onPress={() =>
            formRef.current?.setData({
              name: 'New name',
              cellphone: '18987456899',
            })
          }
          label="Set data form"
        />
      </Form>
    </ContentScrollView>
  );
};

export default AppContent;
