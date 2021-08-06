import {createContext, useState, useEffect, ReactNode, useContext} from 'react';
import { api } from '../Services/api';


interface Transaction{
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;  
}

/*
interface TransactionInput{
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string; 
}
*/

//transactionsinput vai herdar tudo do transaction, menos o id e o cratedAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;



interface TransactionsProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);
   
    useEffect(() => {
        //buscando informações = get
       api.get('transactions')
       .then(response => setTransactions(response.data.transactions))
       
    }, []);

    //toda função asincrona retorna uma promises
    async function createTransaction(transactionInput: TransactionInput){
        // inserir na lista
       const response = await api.post('/transactions',{
        ...transactionInput,
        createdAt: new Date(),
       })
       const {transaction} = response.data 
       //por dentro do estado de transações

      setTransactions([
          ...transactions,
          transaction,
      ]);
    }
 
    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions(){
  const context = useContext(TransactionsContext);
  
  return context;
}