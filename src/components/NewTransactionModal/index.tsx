import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransaction } from '../../hooks/useTransactions';
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
  const {createTransaction} = useTransaction();

  async function handleTransactionSubmit(event : FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    clearModal();
  }

  function clearModal(){
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');

    onRequestClose();
  }

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit')

  return(
    <Modal 
      isOpen={isOpen} 
      onRequestClose={clearModal}
      className='react-modal-content'
      overlayClassName='react-modal-overlay'
    >
      <button type='button' onClick={onRequestClose} className='react-modal-close'>
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleTransactionSubmit}>
        <h2>Cadastrar transação</h2>

        <input type="text" value={title} onChange={event => setTitle(event.target.value)} placeholder='Titulo' />
        <input type="number" placeholder='Valor' value={amount} onChange={event => setAmount(Number(event.target.value))} />

        <TransactionTypeContainer>
          <RadioBox type='button' activeColor='green' onClick={() => setType('deposit')} isActive={type === 'deposit'}>
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox type='button' activeColor='red'  onClick={() => setType('withdraw')}isActive={type === 'withdraw'}>
            <img src={outcomeImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input type="text" placeholder='Categoria' value={category} onChange={event => setCategory(event.target.value)} />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}