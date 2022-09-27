import {useState, useEffect, useCallback, useRef} from 'react'
import styled from 'styled-components';

import {io} from 'socket.io-client';
const socket = io("https://copy-screen.herokuapp.com/");

const Popup = styled.div`
    width: 80%;
    height: 500px;
    background: black;
    border-radius: 20px;
    padding: 20px;
    overflow: auto;
`;


export const Modal = ({url}) => {
  const ref = useRef(null);
  const [cursor, setCursor] = useState("");
  const [image, setImage] = useState("");
  const [fullHeight, setFullHeight] = useState("");
  
  useEffect(() => {
    socket.emit("browse", {url})

    // Listens for the image and full height
    // from the PuppeteerMassScreenshots
    // The image is also converted to a readable file.

    socket.on("image", ({img, fullHeight}) =>{
        setImage("data:image/jpeg;base64,"+ img);
        setFullHeight(fullHeight);
    });
    // Listens to the curso event
    socket.on("cursor", (cur)=> setCursor(cur));
  }, [url]);  

  const mouseMove = useCallback((event)=> {
    const postion = event.currentTarget.getBoundingClientRect();
    const widthChange = 1255 / postion.width;
    const heightChange = 800 / postion.height;

    socket.emit("mouseMove", {
        x: widthChange * (event.pageX - postion.left),
        y: heightChange * (event.pageY - SVGTextPositioningElement.top - document.documentElement.scrollTop)
    });
  }, []);

  const mouseClick = useCallback((event)=> {
    const position = event.currentTarget.getBoundingClientRect();
    const widthChange = 1255 / position.width;
    const heightChange = 800 / position.height;

    socket.emit("mouseClick", {
        x: widthChange * (event.pageX - position.left),
        y: heightChange * (event.pageY - position.top - document.documentElement.scrollTop)
    });
  }, []);

 const mouseScroll = useCallback((event) => {
    const position = event.currentTarget.scrollTop;
    socket.emit("scroll", { position });
  }, []);


  const PopRef = styled.div`
  .popup-ref {
      background: white;
      width: 100%;
      height: 100%;
      position: relative;
      height: ${fullHeight};
      ${cursor}
  }
  img {
      top: 0;
      position: sticky;
      width: 100%;
    }
`;
  return (
    <Popup onScroll={mouseScroll}>
        <PopRef ref={ref}>
            {image && (<img 
                        src={image} 
                        onMouseMove={mouseMove}
                        onClick={mouseClick}
                        alt=''
                        />)
            }
        </PopRef>
    </Popup>
  )
}
