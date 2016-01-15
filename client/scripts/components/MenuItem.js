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

  parseContent(text){
    return <span dangerouslySetInnerHTML={{__html: text.replace(/em>/g,'b>')}} />;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      this.props = nextProps;
      this.setState({content: this.props.content});
    }
  }

  render() {
    return (
        <div className="im-menu-item"
             style={{width: '100%'}}
             onClick={this.handleClick}>
          {this.parseContent(this.state.content)}
        </div>
    );
  }
}

export default IMMenuItem;
