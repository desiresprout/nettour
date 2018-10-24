import React, { Component } from 'react';
import PostDetailPageContainer from 'containers/Post/PostDetailPageContainer';

class PostDetailPage extends Component {    
    
    render() {
        const { match } = this.props;        
        const { username, title } = match.params;


        return (
            <PostDetailPageContainer username={username} title={title} />   
                
            
        );
    }
}

export default PostDetailPage;