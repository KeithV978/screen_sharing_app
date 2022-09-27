import styled from "styled-components";


const ButtonWrapper = styled.button`
    padding: 15px;
    width: 200px;
    cursor: pointer;
    font-size: 16px;
    background-color: #277bc0;
    color: #fff;
    border: none;
    outline: none;
    margin-right: 15px;
    margin-top: 30px;

    &:hover{
        background-color: #fff;
        border: 1px solid #277bc0;
        color: #277bc0;
    }
`;

export const Button = props => {
  let {btnText, clickAction} = props;
  return (
    <ButtonWrapper onClick={clickAction}>{btnText}</ButtonWrapper>
  )
}
