import React, {Fragment} from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

//border : 1px solid ${oc.indigo[9]};
const ErrorWrapper = styled.div`
  position : absolute;
  left : 50%;
  top : 50%;
  transform : translate(-50%, -50%);
  display : flex;
  justify-content : center;
  align-items: center;
  flex-direction : column;  
  border-radius : 0.5rem;
  box-shadow: 0px 0px 23px 0.12px ${oc.indigo[5]};
  width : 500px;
  height : 500px;

  a{
    border-radius: 12px;
    border: 1px solid #495057;
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 2rem;
    transition: all .125s ease-in; 
    border-color : black;
    color : black;
  }
`;

const ErrorMessage = styled.div`
  margin-top : 1rem;
  font-size : 1.5rem;
  color : ${oc.indigo[5]};
  font-weight :500;
`;

const NotFound = () => {
  return ( 
    <Fragment>

    <Helmet>
      <title>Not Found</title>
      <meta name="robots" content="noindex" />
   </Helmet>
   <ErrorWrapper>
      <img src="https://images.nettour.cf/nettour_logo.png"/>
      <ErrorMessage>잘못된 요청입니다</ErrorMessage>
      <Link to="/">홈으로 가기</Link>
    </ErrorWrapper>
    </Fragment>  
  );
};

export default NotFound;