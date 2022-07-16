import { Container } from "./styles";
import imgIncome from '../../assets/income.svg'
import imgOutcome from '../../assets/outcome.svg'
import imgTotal from '../../assets/total.svg'
import { useTransaction } from "../../hooks/useTransactions";


export function Summary(){
  const {transactions} = useTransaction();

  const summary = transactions.reduce((acc, item) => {
    if(item.type == 'deposit'){
      acc.deposit += item.amount;
      acc.total += item.amount;
    }else{
      acc.withdraw += item.amount;
      acc.total -= item.amount;
    }

    return acc;
  },{
    deposit: 0,
    withdraw: 0,
    total: 0
  })

  return(
    <Container className="grid lg:grid-cols-3">
      <div>
        <header>
          <p>Entradas</p>
          <img src={imgIncome} alt="seta verde para cima" />
        </header>
        <strong>
          {
            new Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.deposit)
          }
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={imgOutcome} alt="seta vermelha para baixo" />
        </header>
        <strong>
          {summary.withdraw ? '-' : ''}
          {
            new Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.withdraw)
          }
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={imgTotal} alt="cifrão" />
        </header>
        <strong>
          {
            new Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.total)
          }
        </strong>
      </div>
    </Container>
  )
}