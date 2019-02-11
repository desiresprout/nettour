import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from "query-string";
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import styled from 'styled-components';

const Auth_Wrapper = styled.div`
    width: 100%;
    height : 44px;    
    background: #FFFFFF;
    
    padding-left : 1.75rem;
    padding-right : 1.75rem;
    color : #fff;
   
`;  

const Auth_Header = styled.div` 
    background: rgba(44, 100, 207, 0.64); 
    border-radius: 44px;    
    & > h1{
        font-size: 24px;
        text-align: center;
        vertical-align: middle;
        color: #ffffff;
    }   
`;


const Auth_Message = styled.div`
    display : flex;
    flex-direction : column;
    margin : 50px auto;
    justify-content: space-around;
    height : 150px;

    &> div{
        color : #fff;
        background-color:#c123de;       
        border-radius:6px;
        border:1px solid #a511c0;
        font-size:15px;
	    font-weight:bold;
        padding:12px 75px;
	    text-decoration:none;
        text-shadow:0px 1px 0px #9b14b3;        
    }

    &~ div{
        font-weight : 700;       
        cursor : pointer;        
    }
    ${props => props.click && ` 
        font-weight : 700;       
        cursor : pointer;        
    `}
`;

class EmailAuthContainer extends Component {

    state = {
        email : '',
    }

    initialize = async () => {
        const { history, AuthActions } = this.props;
        const { search } = this.props.location;
        const { email, code } = queryString.parse(search);        

         if (!code && !email) {
          history.push('/auth/register');
          return;
        } 
    
         try {
          if (code && email) {
            await AuthActions.getCode({email, code});           
            this.setState({
                email : email
            })
          }
        } catch (e) {
          console.log(e);
        } 
        
      };    
    
    
    componentDidMount() {
        this.initialize();
    }

    handleAuth = async ()=> {
        const { code, history, AuthActions } = this.props;
          if(code == 'code'){            
            await AuthActions.resetCode(this.state.email);            
        }         
         
    }


    render() {
        const { auth_message, code, resetcode } = this.props;
        const { handleAuth } = this;       

        return (
            <Fragment>            

            <Auth_Wrapper>
                <Auth_Header>
                <h1>NetTouR</h1>
                </Auth_Header>
            </Auth_Wrapper>

            <Auth_Message>
                {
                    code == 'code' && <div>인증코드 만료되었습니다</div>
                }                           
                
                {
                    code == 'code' && <div onClick={handleAuth}>클릭하여 재인증하시오</div>
                }
                {
                    code =='ok' && <div>{auth_message}</div>
                }       
                {
                    code == 'error' && <div>{auth_message}</div>                
                }
                {
                    resetcode == true && <div>이메일을 통해 재인증하십시오</div>
                }
            </Auth_Message>

            </Fragment>
        );
    }
}

export default connect(
    (state) => ({            
        auth_message : state.auth.register.exists.auth_message,
        code : state.auth.register.exists.code, 
        resetcode : state.auth.register.exists.resetcode,      
        
    }),
    (dispatch) => ({
        //PostActions: bindActionCreators(PostActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    }),  
)(withRouter(EmailAuthContainer));

