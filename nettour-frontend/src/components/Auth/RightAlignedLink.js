import React from 'react';
import { Aligner, StyledLink} from 'css/RightAlignedLink';


const RightAlignedLink = ({to, children}) => (
    <Aligner>
        <StyledLink to={to}>{children}</StyledLink>
    </Aligner>
);

export default RightAlignedLink;