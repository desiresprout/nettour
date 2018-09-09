import React, { Fragment } from 'react';
import { Imagewrapper, ImgA, ImgB, ImageContainer} from 'css/Background';


const Background = () => {  
        return (           
            <Imagewrapper>
                <ImageContainer>                
                        <ImgA url="static/images/venice.jpg" ></ImgA>
                        <ImgA url="static/images/worldmap.png"></ImgA>                        
                </ImageContainer>            
            </Imagewrapper>                     
        );
      
};
export default Background;