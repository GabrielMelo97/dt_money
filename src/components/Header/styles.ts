import styled from "styled-components";

export const Container = styled.header`
  background: var(--blue);
  color: #fff;
`

export const Content = styled.div`
  max-width: 1120px ;
  margin: 0 auto;
  padding: 2rem 1rem 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button{
    color: #FFF;
    background: var(--blue-light);
    border: 0;
    /* padding: 0 2rem; */
    border-radius: 0.25rem;
    height: 3rem;
    font-size: 1rem;

    transition: filter 0.2s;

    &:hover{
      filter: brightness(0.9);
    }
  }
`