import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicGists } from "../store/gists/gistSlice";
import Gist from "./Gist";

function GistList() {
  const dispatch = useDispatch();
  const { publicGists, isLoading } = useSelector((state) => state.gists);
  useEffect(() => {
    dispatch(fetchPublicGists());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        publicGists.map((gist) => <Gist key={gist.id} gist={gist} />)
      )}
    </>
  );
}

export default GistList;
