import { createContext, ReactNode, useContext, useEffect, useState } from "react"; 
import { api } from "../services/api";

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
  }

  return(
    <TransactionsContext.Provider value={{transactions , createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransaction(){
  const context = useContext(TransactionsContext);

  return context;
}