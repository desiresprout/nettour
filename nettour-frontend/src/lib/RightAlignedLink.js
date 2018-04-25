import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';


export const Aligner = styled.div`
    margin-top: 1rem;
    text-align: right;
`;

export const StyledLink = styled(Link)`
    color: ${oc.gray[6]};
    &:hover {
        color: ${oc.gray[7]};
    }
`;