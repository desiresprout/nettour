import styled from "styled-components";
import oc from "open-color";
import { shadow, media } from "css/styleUtil";
import { Link } from "react-router-dom";

export const PostBodyCss = styled.div`
  margin-top: 4rem;
  font-size: 1rem;
`;

export const PostHeadCss = styled.div`
  margin-top: 3rem;
  font-size: 1rem;
  & > h1 {
    margin: 0;
    font-size: 3rem;
    line-height: 3rem;
  }
`;

export const UserdisplayCss = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: flex-end;
`;

export const UserThunmailCss = styled(Link)`
  flex-shrink: 0;
  width: 4em;
  height: 4em;
  position: relative;

  & > img {
    border-radius: 50%;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const UserInfoCss = styled.div`
  margin-left: 1em;
  font-size: 0.875rem;
  line-height: 1.5em;
  & > a {
    font-weight: 500;
    color: #212529;
  }
`;

export const Date_likes_number = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
`;
export const LikesWrapper = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-size: 2rem;
    color: ${oc.indigo[7]};
  }
`;

export const Likes = styled.button`
  color: ${oc.indigo[4]};
  border: 1px solid ${oc.indigo[2]};
  width: 3rem;
  height: 3rem;
  background: #fff;
  cursor: pointer;
  border-radius: 1.8rem;
  margin: 0;
  margin-right: 1rem;
  padding: 0;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  font-size: 1.6rem;

  &:hover {
    background: ${oc.indigo[4]};
    color: white;
  }

  svg {
    font-size: 1.4rem;
    border: ${oc.indigo[9]};
  }
`;

export const PostContentCss = styled.div``;
