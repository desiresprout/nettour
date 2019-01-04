import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from "query-string";
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';



class EmailAuthContainer extends Component {

    initialize = async () => {
        const { history, AuthActions } = this.props;
        const { search } = this.props.location;
        const { email, code } = queryString.parse(search);
        console.log(code);
        console.log(email);

         if (!code && !email) {
          history.push('/auth/register');
          return;
        } 
    
         try {
          if (code && email) {
            await AuthActions.getCode({email, code});
          }
        } catch (e) {
          console.log(e);
        } 
        
      };    
    
    
    componentDidMount() {
        this.initialize();
    }


    render() {
        const { auth_message } = this.props;
        return (
            <div>
              {auth_message}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        auth_message : state.auth.register.exists.auth_message,
        
    }),
    (dispatch) => ({
        //PostActions: bindActionCreators(PostActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    }),  
)(withRouter(EmailAuthContainer));

