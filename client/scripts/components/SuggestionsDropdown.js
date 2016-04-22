import React from 'react';

class SuggestionsDropdown extends React.Component {
  render() {
    let menuItems = (this.props.items.map((element, index) => {
      let className = '';
      if (this.props.selectedSuggestion) {
        if (element.highlights === this.props.selectedSuggestion.highlights) {
          className = 'hover';
        }
      }

      return (
        <div
          key={'im-menu-item-' + index}
          className={"im-menu-item " + className}
          style={{width: '100%'}}
          onClick={this.props.selectMItem.bind(null, element)}>
          <span dangerouslySetInnerHTML={{__html: element.highlights.replace(/em>/g,'b>')}} />
        </div>
      );
    }));

    return (
      <div className={"im-dropdown " + ((this.props.className) ? this.props.className : "")} style={this.props.styles}>
        {menuItems}
      </div>
    );
  }
}

export default SuggestionsDropdown;
