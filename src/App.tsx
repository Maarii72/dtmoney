import Modal from 'react-modal';
import { useState } from 'react';
import { Dashboard } from "./Components/Dashboard";
import { Header } from "./Components/Header";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from './Components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactonModalOpen, setIsNewTransactonModalOpen] = useState(false);
  
    function handleOpenNewTransactionModal(){
       setIsNewTransactonModalOpen(true); 
        
    }
    
    function handleCloseNewTransactionModal(){
        setIsNewTransactonModalOpen(false);
    } 

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />
      <NewTransactionModal 
        isOpen={isNewTransactonModalOpen}
        onRequestClose= {handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}


