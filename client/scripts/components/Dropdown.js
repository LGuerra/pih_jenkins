import React from 'react'
import IMMenuItem from './MenuItem'

class IMDropdown extends React.Component {
  constructor(props) {
    super(props);
    console.log("PROPS in Dropdown", this.props);
    this.state = {menuItems: this.props.items};
  }

  componentWillReceiveProps(nextProps) {
    console.log("------Dropdown------");
    if (nextProps.items !== this.props.items) {
      console.log("nextProps", nextProps);
      this.props = nextProps;
      this.setState({menuItems: this.props.items});
    }
  }

  render() {
    console.log("menuItems in Dropwdown --> ", this.state.menuItems);
    let menuItems = (this.state.menuItems.map((e,i) => {
      return (<IMMenuItem key={i}
                          content={e}
                          styles={this.props.styles}
                          selectMItem={this.props.selectMItem}/>
      );
    }));

    return (
      <div className="im-dropdown" style={this.props.styles}>
        {menuItems}
      </div>
    );
  }
}

module.exports = IMDropdown;
