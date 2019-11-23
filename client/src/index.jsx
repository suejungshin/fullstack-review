import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

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
    this.setState({username: term});

    axios({
      method: 'post',
      url: 'http://localhost:1128/repos',
      data: term
    })
      .then((data)=> {
        console.log('get request successful')
        this.get();
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  // search (term) {
  //   console.log(`${term} was searched`);
  //   // TODO
  //   this.setState({username: term})
  //   $.ajax({
  //     method: 'POST',
  //     url: 'http://localhost:1128/repos',
  //     data: term,
  //     success: () => {
  //       console.log('post request successful')
  //       this.get();
  //     }
  //   })
  // }

  get () {
    // TODO
    axios({
      method: 'GET',
      url: 'http://localhost:1128/repos'
    })
    .then((data) => {
      console.log(data.data)
        this.setState((state) => {
          console.log('get request successful')
          state.repos = state.repos.concat(data.data);
          return state;
        });
      });
  }
  // get () {
  //   // TODO
  //   $.ajax({
  //     method: 'GET',
  //     url: 'http://localhost:1128/repos',
  //     success: (data) => {
  //       this.setState((state) => {
  //         console.log('get request successful')
  //         state.repos = state.repos.concat(data);
  //         return state;
  //       });
  //     }
  //   })
  // }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList username={this.state.username} repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));