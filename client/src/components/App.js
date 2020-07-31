import React from 'react';
import Routes from './Routes'
import Nav from './shared/Nav'

//import Axios from 'axios';

function App() {
  // const resp = Axios.get('/test').then(resp => {
  //   console.log(resp.data.message);
  // });

  return (
    <React.Fragment>
      <Nav/>
      <Routes/>
    </React.Fragment>
  );
}

export default App;
