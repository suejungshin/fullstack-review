import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.get = this.get.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      data: term,
      success: (term) => {
        this.get(term);
        console.log('Success callback for post request here')
      }
    })
  }

  get (term) {
    console.log(`${term} was requested`);
    // TODO
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      success: (data) => {
        this.setState({repos: this.state.repos.concat(data)}, this.render);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));