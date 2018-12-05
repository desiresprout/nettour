import React, { Component } from 'react';
import { CardContentCss, UserThunmnailCss, ContentHeadCss, UsernameCss, SubinfoCss, DescriptionCss  } from 'css/PostsCardContent';
import { Link } from 'react-router-dom';
import { Fromnow } from 'lib/common';
//<img src="https://images.velog.io/profiles/devfromhell/thumbnails/1538382543.776.jpeg"/>

const PostsCardContent = ({ username, title, thumnail, date, count } ) => {
    return (
        <CardContentCss>

            <UserThunmnailCss to="/">
                <img src={thumnail}/>
            </UserThunmnailCss>

            <ContentHeadCss>
                <UsernameCss to="/"/>
                <h3> <Link to="/"> {title} </Link> </h3>
                <SubinfoCss>
                    <span>{Fromnow(date)}</span>
                    <span className="a">댓글 : {count}</span>
                </SubinfoCss>                
            </ContentHeadCss>

            <DescriptionCss/>
            
        </CardContentCss>
    );
};

export default PostsCardContent;