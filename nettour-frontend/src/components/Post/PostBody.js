import React, { Fragment } from 'react';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { PostBodyCss, PostHeadCss, UserdisplayCss, UserThunmailCss, UserInfoCss, Date_likes_number } from 'css/PostBody';
import { Fromnow} from 'lib/common';
import { Link } from 'react-router-dom';
import { SeparatorCss} from 'css/Separator';
import { PostAction } from 'components/Post';

const PostBody = ({title, likes, date, username, own, id, onaskremove } ) => {
    //const changedate = Fromnow(date);
    //const changecontent = htmlToDraft(convertFromRaw(state.getCurrentContent()));  
        //img에 유저프로필 렌더링
    return (
      
        <PostBodyCss className="PostBody">
            <PostHeadCss className="PostHead">
                <UserdisplayCss className="Userdisplay">
                    <Link to={'/'}>
                        <img/>
                    </Link> 
                <UserInfoCss>
                    <Link to={'/'}>{username}</Link>
                </UserInfoCss>               

                    
                </UserdisplayCss>
                <h1>{title}</h1>
                <Date_likes_number className="Date">
                    <h3>{Fromnow(date)}</h3>
                    <button>"좋아요버튼만들기"</button>
                </Date_likes_number>
                <SeparatorCss/>
                { own && <PostAction id={id} onaskremove={onaskremove} /> }
            </PostHeadCss>
        </PostBodyCss>      
        
    );
};

export default PostBody;