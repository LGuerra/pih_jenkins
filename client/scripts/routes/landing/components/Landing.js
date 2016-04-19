import React from 'react';
import SearchForm from 'im-components/SearchForm';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <SearchForm />
      </div>
    );
  }
}

module.exports = Landing;
