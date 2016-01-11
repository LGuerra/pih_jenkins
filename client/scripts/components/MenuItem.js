import React from 'react';

class IMMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: this.props.content};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    return this.props.selectMItem(this.state.content);
  }

  render() {
    return (
        <div className="im-menu-item"
             style={{width: this.props.styles.width}}
             onClick={this.handleClick}>
          {this.state.content}
        </div>
    );
  }
}

module.exports = IMMenuItem;
