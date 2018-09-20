import React, { Component } from 'react';
import { BoardWrapper } from 'css/Main';

class BoardContainer extends Component {
    
    render() { 
        return (
            <BoardWrapper>            
            
            </BoardWrapper>            
          
          
            

         );
    }
}
export default BoardContainer;



  /* export default connect(
    // state 를 비구조화 할당 해주었습니다
    ({ todo }) => ({
      // immutable 을 사용하니, 값을 조회 할 때엔느 .get 을 사용해주어야하죠.
      
      todos: todo.get('todos')
    }),
    (dispatch) => ({
      BoardActions: bindActionCreators(todoActions, dispatch)
    })
  )(BoardContainer);

  */

