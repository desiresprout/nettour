import React, { Component } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import oc from 'open-color';

const transitions = {
    watch: keyframes`
        0% {
            transform: translate(calc(100% + 1rem));
        }        
        100% {
            transform: translateY(0%);
        }
    `,
    blind : keyframes`
        0% {
            transform: translate(0%);    
        }    
        100% {
            transform: translate(calc(100% + 1rem));
        }
    `,
};

const NotifyWrapper = styled.div`
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    border-radius: 1.5rem;
    color: white;
    min-width: 200px;
    padding: 0.75rem;
    padding-left: 1rem;
    display: flex;
    justify-content: center;
    padding-right: 1rem;
    font-size: 0.875rem;
    line-height: 1.3rem;
    font-weight: 600;    

    ${props => props.watch && `
        animation : ${transitions.watch} 0.5s ease-in;        
        animation-fill-mode: forwards;
        
    `}
    ${props => props.blind && `
         animation : ${transitions.blind} 0.5s ease-in;    
         animation-fill-mode: forwards;   
    `}
    ${props => props.code && `
         background: ${oc.indigo[5]};
    `}
    
`;

class Notify extends Component {
    state = {
        animate : false,  
    };
    HideTimeout = null;
    animateTimeout = null;

    componentDidUpdate(prevProps, prevState) {       
    if (!prevProps.notify.watch && this.props.notify.watch) { //visible이 같을시에 
        if (this.HideTimeout) {
          clearTimeout(this.HideTimeout);
          this.HideTimeout = null;
        }
        this.HideTimeout = setTimeout(() => {
          this.props.Hide();
          this.HideTimeout = null; 
        }, 3000);
      }
  
      if (prevProps.notify.watch !== this.props.notify.watch) {
        this.setState({
            animate: true,
        });
        if (this.animateTimeout) {
          clearTimeout(this.animateTimeout);
          this.animateTimeout = null;
        }
        this.animateTimeout = setTimeout(() => {
          this.setState({
            animate: false,
          });
        }, 3000);
      }
    }
    render() {
      const { code, message, watch } = this.props.notify;
      const { animate } = this.state;

      const animation = (() => {
        if (!animate) return '';
        return watch ? 'watch' : 'blind';
      })();      

      if (!animate && !watch) return null;
      if (!code || !message) return null;

      return <NotifyWrapper className="notifywrapper" code={code} animation={animation}>{message}</NotifyWrapper>;
    }   
}

export default Notify;