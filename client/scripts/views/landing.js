import React from 'react';
import MainNavbar from  '../components/MainNavbar';
import SearchForm from '../components/SearchForm';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <MainNavbar />
        <SearchForm />
      </div>
    );
  }
}

module.exports = Landing;
