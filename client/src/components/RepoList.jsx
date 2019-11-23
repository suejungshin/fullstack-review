import React from 'react';
import Repo from './Repo.jsx'

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <h3>Here are (up to) the top 25 repos for: {props.username}</h3>
    {props.repos.map( (repoObj) => {
      return <Repo repo={repoObj} key={repoObj._id}></Repo>
    })}
  </div>
)

export default RepoList;