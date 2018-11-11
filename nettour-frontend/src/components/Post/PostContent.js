import React from 'react';
import { ContentCss, RenderingCss} from 'css/PostContent'

const PostContent = (dangerouslySetInnerHTML) => {
    return (
        <ContentCss>
            <RenderingCss>
                {dangerouslySetInnerHTML}
            </RenderingCss>
        </ContentCss>
    );
};

export default PostContent;