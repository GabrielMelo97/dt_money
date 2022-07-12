import { Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal} : HeaderProps){
  return(
    <Container>
      <Content>
        <img src={logoImg} alt="dtmoney logo" />
        
        <button type="button" className="px-3 sm:px-8" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}