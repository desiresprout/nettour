import React, { Component } from 'react';
import UserPost from 'components/Base/UserMenu/UserPost';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postsActions from 'store/modules/post';
import { UserPostList }  from 'components/Base/UserMenu';

class UserPostContainer extends Component {

    prev = null;

    load = async () => {
        const { PostsActions, username } = this.props;
       
        try {
            await PostsActions.postlists(username || '');
            const { next } = this.props;           
            
            if(next) {                               
                await PostsActions.prefetchpost(next);
            }
        } catch (e) {
            console.log(e);
        }

    }

    loadNext = async () => {
        const { PostsActions, next } = this.props;
        
        PostsActions.showPrefetchedPost(); 

        if(next === this.prev || !next) return; 
        this.prev = next;
        
        try {
            await PostsActions.prefetchpost(next);
        } catch (e) {
            console.log(e);
        }
        this.handleScroll(); 
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    

    handleScroll = () => {
      
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if(scrollHeight - innerHeight - scrollTop < 100) {
            this.loadNext();
        }
    }    

    componentDidMount() {
        this.load();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.username !== this.props.username) {
            this.load(); 
        }
    }
    
    
    render() {
         const { userpost, username } = this.props;     
        
        return (
            <UserPostList username={username} userpost={userpost}/>
        );
    }
}

export default connect(
    (state) => ({
         logged: state.user.logged,
         next: state.post.next,
         userpost: state.post.data
    }),
    (dispatch) => ({
        PostsActions: bindActionCreators(postsActions, dispatch)
    })
)(UserPostContainer);