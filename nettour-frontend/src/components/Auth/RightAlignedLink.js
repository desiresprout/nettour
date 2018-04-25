import React from 'react';
import { Aligner, StyledLink} from 'lib/RightAlignedLink';


const RightAlignedLink = ({to, children}) => (
    <Aligner>
        <StyledLink to={to}>{children}</StyledLink>
    </Aligner>
);

export default RightAlignedLink;