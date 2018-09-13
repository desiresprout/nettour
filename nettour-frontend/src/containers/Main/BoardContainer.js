import React, { Component } from 'react';
import { BoardList }  from 'components/Main';


// state.question
//state.post
//

class BoardContainer extends Component {
    state = {  }
    render() { 
        return ( 
            <BoardList>


            </BoardList>

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

