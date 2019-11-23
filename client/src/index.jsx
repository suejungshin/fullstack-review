import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      username: ''
    }

    this.get = this.get.bind(this);
  }

  componentDidMount() {
    this.get()
  }

  componentDidUpdate() {
    this.render()
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    this.setState({username: term})
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      data: term,
      success: () => {
        console.log('post request successful')
        this.get();
      }
    })
  }

  get () {
    // TODO
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      success: (data) => {
        this.setState((state) => {
          console.log('get request successful')
          state.repos = state.repos.concat(data);
          return state;
        });
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList username={this.state.username} repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));