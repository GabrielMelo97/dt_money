import { useTransaction } from "../../hooks/useTransactions";
import { Container } from "./styles";
import { Trash } from "phosphor-react"

export function TransactionsTable(){
  const {transactions} = useTransaction();
  const {removeTransaction} = useTransaction();

  return(
    <Container className="w-full overflow-auto">
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>   

          { 
            transactions.length > 0 
              ? 
            (
              transactions.map(item => ( 
                <tr key={item.id}>
                  <td className="whitespace-nowrap">{item.title}</td>
                  <td className={item.type+" whitespace-nowrap"}>
                  {item.type == 'withdraw' && '- '}
                  { new Intl.NumberFormat('pt-br', {
                    style:'currency',
                    currency: 'BRL'
                  }).format(item.amount)}
                  </td>
                  <td className="whitespace-nowrap">{item.category}</td>
                  <td className="whitespace-nowrap">
                    { 
                      new Intl.DateTimeFormat('pt-br').format(
                        new Date(item.createdAt)
                      )
                    }  
                  </td>
                  <td className="">
                    <button type="button" className="w-full" onClick={() => removeTransaction(item.id)}>
                      <Trash size={30} weight="regular" color="#ec6279" className="m-auto" />
                    </button>
                  </td>
                </tr>
              ))
            ) 
              : 
            (
              <tr>
                <td className="text-center" colSpan={5}>Nenhum registro cadastrado.</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </Container>
  )
}