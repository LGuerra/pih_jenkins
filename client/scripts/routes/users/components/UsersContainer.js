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

UsersContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UsersContainer;
