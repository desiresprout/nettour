import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link } from 'react-router-dom';

export const PostCardCss = styled.div`
    display : block;
    width : calc(33.333% - 1.75rem);
    text-decoration : none;
    cursor : pointer; 
    margin : 0.875rem;
            
    
`;

export const PostThumbnailCss = styled(Link)`
    display : block;
    position : relative;
    width: 100%;  
    padding-top: 52.63%;
    position: relative;    
    
    
`;

export const ImageholderCss = styled.div`
    background: ${oc.gray[3]};
    font-size: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #98a8b9;

    object-fit : cover;
    position : absolute;
    top: 0;
    left: 0;
    width : 100%;
    height : 100%;
    border-top-left-radius : 4px;
    border-top-right-radius : 4px;

    & > svg{        
        vertical-align : middle;        
       
    }
`;

export const RadiusMaskCss = styled.div`
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    opacity : 0;
    transition : all .125s ease-in;    
    border-top-left-radius : 4px;
    border-top-right-radius : 4px;
`;

