import React from 'react'
import IMMenuItem from './MenuItem'

class IMDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state       = {menuItems: this.props.items};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.props = nextProps;
      this.setState({menuItems: this.props.items});
    }
  }

  render() {
    let menuItems = (this.state.menuItems.map((e,i) => {
      let className = "";
      if (e === this.props.selectedSuggestion) { className = "hover"; }
      return (<IMMenuItem key={i}
                          content={e}
                          styles={this.props.styles}
                          className={className}
                          selectMItem={this.props.selectMItem}/>
      );
    }));

    return (
      <div className={"im-dropdown " + ((this.props.className) ? this.props.className : "")} style={this.props.styles}>
        {menuItems}
      </div>
    );
  }
}

export default IMDropdown;
