import React, { Fragment } from 'react';
import { Imagewrapper, ImgA, ImgB, ImageContainer} from 'css/Background';
import venice from 'static/images/venice.jpg';


const Background = () => {  
        return (           
            <Imagewrapper>
                <ImageContainer>                
                        <ImgA url={venice} ></ImgA>
                        <ImgA url={venice}></ImgA>                        
                </ImageContainer>            
            </Imagewrapper>                     
        );
      
};
export default Background;