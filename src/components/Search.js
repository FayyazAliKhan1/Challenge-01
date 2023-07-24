import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Octicon from "react-octicon";
import { fetchUserGists } from "../store/gists/gistSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const handleSearchChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchUserGists(username)).then(() => setUsername(""));
  };
  return (
    <Wrapper>
      <InputBox data-testid="input-box">
        <Octicon data-testid="search-icon" name="search" />
        <form data-testid="search-form" onSubmit={handleSearchSubmit}>
          <Input
            type="text"
            value={username}
            onChange={handleSearchChange}
            placeholder="Search Gists for the username"
          />
        </form>
      </InputBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  margin: 0 16px;
`;

const InputBox = styled.div`
  border-radius: 4px;
  display: flex;
  width: 400px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;

  &:focus {
    outline: 0;
  }
`;

export default Search;
