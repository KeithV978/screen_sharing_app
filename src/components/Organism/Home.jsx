import React, {useCallback, useState} from 'react'
import styled from 'styled-components'

import { Modal } from '../Molecules/Modal';
import {Button} from '../Atoms/Button'

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 55vh;
    width: 100%;
    align-items: center;  
    justify-content: center;

      
  & h2 {margin-bottom: 30px;}
  .form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 30px;
  }
`;
export const Home = () => {
  const [url, setURL] = useState("");
  const [show, setShow] = useState(false);
  
  const handleCreateChannel = useCallback(()=> setShow(true),[]);

  return (
    <HomeContainer>
       <h2>URL</h2>
        <form className='form'>
            <label>Provide a URL</label>
            <input
                type='url'
                name='url'
                id='url'
                className='form_input'
                required
                value={url}
                onChange={(event) => setURL(event.target.value)}
            />
        </form>
        {show && <Modal url={url} />}
        <Button clickAction={handleCreateChannel} btnText="BROWSE"/>
    </HomeContainer>
  )
}
