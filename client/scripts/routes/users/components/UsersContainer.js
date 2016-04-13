import React from 'react';

class UsersContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default UsersContainer;
