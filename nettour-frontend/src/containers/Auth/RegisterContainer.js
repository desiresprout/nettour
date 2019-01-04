import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError, SocialDivider  } from 'components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';
import {isEmail, isLength, isAlphanumeric} from 'validator';
import debounce from 'lodash/debounce';
import storage from 'lib/storage';
import * as userActions from 'redux/modules/user';
import SocialLoginContainer from './SocialLoginContainer';

class Register extends Component {

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register')
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });

        const validation = this.validate[name](value);
        if(name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침
        const check = name === 'email' ? this.checkEmailExists : this.checkUsernameExists; 
        // name 에 따라 이메일체크할지 아이디 체크 할지 결정
        check(value);        
    
    }

    setError = (message) => {       
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'register',
            message
        });
    }

    validate = {
        email: (value) => {
            if(!isEmail(value)) {
                this.setError('잘못된 이메일 형식 입니다.');
                return false;
            }
            return true;
        },
        username: (value) => {
            if(!isAlphanumeric(value) || !isLength(value, { min:4, max: 15 })) {
                this.setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
                return false;
            }
            return true;
        },
        password: (value) => {
            if(!isLength(value, { min: 6 })) {
                this.setError('비밀번호를 6자 이상 입력하세요.');
                return false;
            }
            this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
            return true;
        },
        passwordConfirm: (value) => {
            if(this.props.register.password !== value) {
                this.setError('비밀번호확인이 일치하지 않습니다.');
                return false;
            }
            this.setError(null); this.setError(null); 
            return true;
        }
    }

    checkEmailExists = debounce(async (email) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkEmailExists(email);
            if(this.props.exists.email) {
                this.setError('이미 존재하는 이메일입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    },300)

    checkUsernameExists = debounce(async (username) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkUsernameExists(username);
            if(this.props.exists.username) {
                this.setError('이미 존재하는 아이디입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    },300) // 300ms

    handleLocalRegister = async () => {
        const { register, AuthActions, error, history, UserActions } = this.props;
        const { email, username, password, passwordConfirm } = register;
        const { validate } = this;

        if(error) return; 
        if(!validate['email'](email)   // validate[키](값)
            || !validate['username'](username) 
            || !validate['password'](password) 
            || !validate['passwordConfirm'](passwordConfirm)) {            
            return;
        }
        
        try {
            await AuthActions.localRegister({
                email, username, password
            });         
         
            if(!this.props.exists.confirming) return;
            this.setError('이메일 인증을 진행해주세요'); 
            
            setTimeout(() => {
                history.push('/auth/login')
              }, 7000);  
            
            //history.push('/auth/login')
            //this.props.result - { thumbail : xxx,  username : xxx }    
            /* storage.set('loggedInfo', loggedInfo);            
            UserActions.setLoggedInfo(loggedInfo);
            UserActions.setValidated(true); 
            history.push('/');  */ 
        } catch(e) {            
            if(e.response.status === 409) {
                const { key } = e.response.data;
                const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
                return this.setError(message);
            }
            this.setError('알 수 없는 에러가 발생했습니다.')
        }
    }        

    render() {
        const { error } = this.props;
        const { email, username, password, passwordConfirm } = this.props.register;
        const { handleChange, handleLocalRegister } = this;


        return (
            <AuthContent title="회원가입">
                <InputWithLabel 
                    label="이메일"
                    name="email"
                    placeholder="이메일" 
                    value={email} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label="아이디" 
                    name="username" 
                    placeholder="아이디" 
                    value={username} 
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
                <InputWithLabel 
                    label="비밀번호 확인" 
                    name="passwordConfirm" 
                    placeholder="비밀번호 확인" 
                    type="password" 
                    value={passwordConfirm}
                    onChange={handleChange}
                />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
                <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
                <SocialDivider/>
                <SocialLoginContainer/>
            </AuthContent>
        );
    }
}
//<SocialLoginContainer/>
export default connect(
    (state) => ({
        register: state.auth.register,
        error: state.auth.register.error,
        exists: state.auth.register.exists,
        confirming : state.auth.register.exists.confirming,
        result: state.auth.result,
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Register);