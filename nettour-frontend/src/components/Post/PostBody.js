import React, { Fragment } from 'react';
import { PostBodyCss, PostHeadCss, UserdisplayCss, UserInfoCss, Date_likes_number } from 'css/PostBody';
import { Fromnow} from 'lib/common';
import { Link } from 'react-router-dom';
import { SeparatorCss} from 'css/Separator';
import { PostAction } from 'components/Post';

const PostBody = ({title, likes, date, username, own, id, onremovepost } ) => {
    
    return (      
        <PostBodyCss className="PostBody">
            <PostHeadCss className="PostHead">
                <UserdisplayCss className="Userdisplay">
                    <Link to={'/'}>
                        
                    </Link> 
                <UserInfoCss>
                    <Link to={'/'}> 작성자 : {username}</Link>
                </UserInfoCss>               

                    
                </UserdisplayCss>
                <h1>{title}</h1>
                <Date_likes_number className="Date">
                    <h3>{Fromnow(date)}</h3>
                    
                </Date_likes_number>
                <SeparatorCss/>
                { own && <PostAction id={id} onremovepost={onremovepost} /> }
                
            </PostHeadCss>
        </PostBodyCss>         
    );
};

export default PostBody;