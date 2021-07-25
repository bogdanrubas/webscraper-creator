import React, { useContext } from 'react';
import { AddCrawlerModalWrapper } from './styles';
import Modal from 'layout/Modal';
import Input from 'layout/Input';
import Button from 'layout/Button';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import CreateCrawlerMutation from 'graphql/crawlers/CreateCrawlerMutation.graphql';
import { ModalsContext } from '../ctx/modalsContext';

interface AddCrawlerModalProps {

}

const AddCrawlerModal: React.FunctionComponent<AddCrawlerModalProps> = () => {
  const { showModals, toggleModal } = useContext(ModalsContext),
    [createCrawler] = useMutation(CreateCrawlerMutation),
    addCrawlerSchema = yup.object().shape({
      name: yup.string().required(),
    }),
    methods = useForm({
      resolver: yupResolver(addCrawlerSchema),
      mode: 'onChange'
    });

  const onSubmit = async (values: any) => {
    console.log(values);

    const res = await createCrawler({ variables: { data: { ...values } } });
    console.log(res);

    toggleModal('shouldShowAddCrawlerModal', false);
  };

  return (
    <AddCrawlerModalWrapper>
      <Modal
        title='Add crawler'
        closeModal={() => toggleModal('shouldShowAddCrawlerModal', false)}
        shouldShow={showModals().shouldShowAddCrawlerModal}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input shadow='container' type='topLabel' label='Name' name='name' />
            <Button buttonType='submit' value='Create' />
          </form>
        </FormProvider>
      </Modal>
    </AddCrawlerModalWrapper >
  );
};

export default AddCrawlerModal;
