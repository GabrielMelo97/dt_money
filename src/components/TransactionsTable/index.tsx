import { useTransaction } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function TransactionsTable(){
  const {transactions} = useTransaction();

  return(
    <Container className="w-full overflow-auto">
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>   
          {
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
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  )
}