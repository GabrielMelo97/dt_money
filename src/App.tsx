import { Dashboards } from "./components/Dashboards";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal';
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";
import { ToastContainer } from "react-toastify";

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboards />

      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
      < ToastContainer />
      <GlobalStyle />
    </TransactionsProvider>
  );
}