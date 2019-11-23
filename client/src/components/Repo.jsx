import React from 'react';

const Repo = (props) => {

  return (
    <div>
    <span>{props.repo.name}</span>&nbsp;&nbsp;
    <a href= {props.repo.html_url}>{props.repo.html_url}</a>
    </div>
  )
}

export default Repo;