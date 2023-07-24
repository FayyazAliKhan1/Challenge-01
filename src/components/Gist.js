import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  RepoForkedIcon,
  CommentIcon,
  StarFillIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileCodeIcon,
} from "@primer/octicons-react";
import { formatDate } from "../helpers/constants";

const Gist = ({ gist }) => {
  const {
    url,
    forks_url,
    owner,
    files,
    description,
    comments_url,
    created_at,
    updated_at,
  } = gist;
  const filesData = Object.entries(files);
  return (
    <Container>
      <TopContent>
        <PersonBio>
          <Avatar src={owner.avatar_url} alt="Person Image" />
          <PersonName>{gist.owner.login}</PersonName>
        </PersonBio>
        <PersonBio>
          <SubDiv>
            <ChevronLeftIcon size={16} />
            <ChevronRightIcon size={16} />
            <Paragraph href={url} target="_blank">
              {Object.keys(files).length} Files
            </Paragraph>
          </SubDiv>
          <SubDiv>
            <RepoForkedIcon size={16} />
            <Paragraph href={forks_url} target="_blank">
              Forks
            </Paragraph>
          </SubDiv>
          <SubDiv>
            <CommentIcon size={16} />
            <Paragraph href={comments_url} target="_blank">
              Comments
            </Paragraph>
          </SubDiv>
          <SubDiv>
            <StarFillIcon size={16} />
            <Paragraph href={owner.starred_url} target="_blank">
              Stars
            </Paragraph>
          </SubDiv>
        </PersonBio>
      </TopContent>
      <DateContainer>
        <DateParagraph>Created at: {formatDate(created_at)}</DateParagraph>
        <DateParagraph>Last updated: {formatDate(updated_at)}</DateParagraph>
      </DateContainer>
      <Description>{description}</Description>
      <FileInfo>
        {filesData.map(
          ([key, value]) =>
            value.language != null && (
              <Fragment key={key}>
                <Icon>
                  <FileCodeIcon size={14} />
                </Icon>
                <Paragraph>{value.filename}</Paragraph>
              </Fragment>
            )
        )}
      </FileInfo>
      <LineSeparator />
    </Container>
  );
};
Gist.propTypes = {
  url: PropTypes.string,
  forks_url: PropTypes.string,
  owner: PropTypes.object,
  files: PropTypes.object,
  description: PropTypes.string,
  comments_url: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
};

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  padding-top: 1rem;
  //   text-align: center;
  color: #006ee6;
`;
const PersonBio = styled.div`
  display: flex;
  align-items: center;
`;
const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PersonName = styled.p`
  font-size: 14px;
  margin: 0;
`;
const Paragraph = styled.a`
  margin-left: 0.5rem;
  text-decoration: none;
`;
const SubDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;
const DateContainer = styled.div`
  color: #888;
  font-size: 0.8rem;
  display: flex;
`;

const DateParagraph = styled.p`
  margin-top: 4px;
  margin-right: 0.5rem;
`;
const Icon = styled.div`
  margin-left: 0.7rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-top: 0;
  color: #6b6b6b;
  //   background-color: red;
`;
const FileInfo = styled.div`
  height: 1rem;
  align-items: center;
  display: flex;
  color: #006ee6;
  font-size: 0.8rem;
`;
const LineSeparator = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin-top: 3rem;
`;
export default Gist;
