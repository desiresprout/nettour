import React, { Component } from 'react';
import styled from 'styled-components';



const ThumbnailImage = styled.div`
            cursor : pointer;
            height : 2.25rem;           
            padding : 0 .75rem;
            font-weight : 300;
            line-height : 0;
            font-size : 0.875rem;
            display : flex;
            align-items : center;           
            background : #4c6ef5;
            color : #fff;
            margin-right : 1rem;            
`;


const Thumbnail = ({onThumbnailupload}) => {
    return (
        <ThumbnailImage onClick={onThumbnailupload}>
                썸네일
        </ThumbnailImage>
    );
};

export default Thumbnail;

