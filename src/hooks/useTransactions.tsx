import { createContext, ReactNode, useContext, useEffect, useState } from "react"; 
import { api } from "../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Transactions {
  id: number;
  title: string;
  type: string;
  amount: number;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit <Transactions, 'id' | 'createdAt'>;

interface TransactionProviderProps{
  children: ReactNode;
}

interface TransactionContextProps {
  transactions: Transactions[];
  createTransaction : (transactions: TransactionInput) => void;
  removeTransaction : (id: number) => void;
}

const TransactionsContext = createContext<TransactionContextProps>(
  {} as TransactionContextProps
);

export function TransactionsProvider({children}: TransactionProviderProps){
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(newTransaction: TransactionInput){
    const response = await api.post('/transactions', {
      ...newTransaction,
      createdAt: new Date()
    })

    const { transaction } = response.data;

    setTransactions([
      transaction,
      ...transactions
    ])

    toast.success('Transação adicionada!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function removeTransaction(id: number){
    console.log(id)
    const transactionRemoved = transactions.filter(transaction => transaction.id !== id)

    console.log(transactionRemoved)

    setTransactions(transactionRemoved)

    toast.success('Transação deletada!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // theme: "colored"
    });
  }

  return(
    <TransactionsContext.Provider value={{transactions , createTransaction, removeTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransaction(){
  const context = useContext(TransactionsContext);

  return context;
}