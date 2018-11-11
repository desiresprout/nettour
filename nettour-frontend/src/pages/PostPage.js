import React, { Component,Fragment} from 'react';
import PostViewContainer from 'containers/Post/PostViewContainer';
import PostCommentContainer from 'containers/Post/PostCommentContainer';
import { PostTemplateCss } from 'css/PostHead';

class PostPage extends Component {    
    
    render() {
        const { match } = this.props;
            
        const { username, urlslug } = match.params;


        return (    
                <Fragment>              
                <PostViewContainer name={username} urlslug={decodeURI(urlslug)} />
                <PostCommentContainer/>
                </Fragment>                
            
        );
    }
}

export default PostPage;