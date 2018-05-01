import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'css/styleUtil';
import { Link  } from 'react-router-dom';

export const Wrapper = styled.nav`    
    position : fixed;    
    margin-top : 58px;    
    height: 80px; // topMenu의 높이를 30px로 설정(제대로 설정 안하면 아래 내용이 깨짐) 
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    background:  ${oc.gray[2]};        
`;

export const Menuul = styled.ul`
    display: flex;
    flex-flow : row wrap;
    justify-content: center;    
    list-style-type:none;   //리스트 앞에 점 없애기
    margin:0; 
    padding-top : 15px;      
`;

export const Menuli = styled.li`         
    padding: 0 75px; 
    font-size : 25px;       
`;

export const MenuLink = styled(Link)`
    color : black;     // font-color가 아님..       
    text-decoration: none;
    &:hover {
        background:#f9f9f9;
                         
      }          
`;

     


        