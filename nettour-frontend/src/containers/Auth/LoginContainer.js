import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, SocialButtons, AuthError, SocialDivider } from 'components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import storage from 'lib/storage';
import SocialLoginContainer from 'containers/Auth/SocialLoginContainer';  

class Login extends Component {

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('login')
    }
    

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form : "login"
        });
        
    }

    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: "login",
            message
        });
        return false;
    }

    handleLocalLogin = async () => {
        const { login, AuthActions, UserActions, history } = this.props;
        const { email, password } = login;

        try {
            await AuthActions.localLogin({email, password});
            const loggedInfo = this.props.result;
            UserActions.setLoggedInfo(loggedInfo);
            history.push('/');
            storage.set('loggedInfo', loggedInfo);

        } catch (e) {            
            this.setError('잘못된 계정정보입니다.');
        }
    }   

    render() {
        const { email, password } = this.props.login; // form 에서 email 과 password 값을 읽어옴
        const { handleChange, handleLocalLogin } = this;
        const { error } = this.props;

        return (
            <AuthContent title="로그인">
                <InputWithLabel 
                    label="이메일" 
                    name="email" 
                    placeholder="이메일" 
                    value={email} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label="비밀번호" 
                    name="password" 
                    placeholder="비밀번호" 
                    type="password" 
                    value={password} 
                    onChange={handleChange}
                />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
                <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>              
                <SocialDivider/>
                <SocialLoginContainer/>
            </AuthContent>
        );
    }
}
//<SocialButtons onSocialLogin={handleSocialLogin}/>

export default connect(
    (state) => ({
        login: state.auth.login,
        error: state.auth.login.error,
        result: state.auth.result,
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Login);