import React from 'react';

const Repo = (props) => {

  return (
    <div className="repo">
    <div>{props.repo.name}</div>
    <div>{props.repo.forks_count} forks</div>
    <a href= {props.repo.html_url}>{props.repo.html_url}</a>
    </div>
  )

}


export default Repo;