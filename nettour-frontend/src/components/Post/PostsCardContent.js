import React, { Component } from 'react';
import { CardContentCss, UserThunmnailCss, ContentHeadCss, UsernameCss, SubinfoCss, DescriptionCss  } from 'css/PostsCardContent';
import { Link } from 'react-router-dom';

const PostsCardContent = ({ username, title } ) => {
    return (
        <CardContentCss>

            <UserThunmnailCss to="/">
                <img src="https://images.velog.io/profiles/devfromhell/thumbnails/1538382543.776.jpeg"/>
            </UserThunmnailCss>

            <ContentHeadCss>
                <UsernameCss to="/"/>
                <h3> <Link to="/"> asdasd </Link> </h3>
                <SubinfoCss>
                    <span>2일전</span>
                    <span>댓글갯수</span>
                </SubinfoCss>                
            </ContentHeadCss>

            <DescriptionCss/>
            
        </CardContentCss>
    );
};

export default PostsCardContent;