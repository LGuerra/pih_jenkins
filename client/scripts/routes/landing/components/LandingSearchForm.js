import React, { Component } from 'react';
import { connect } from 'react-redux';

import SuggestionsInputField            from '../../../components/SuggestionsInputField';
import { onSetColonia, onSetVivienda }  from '../../../actions/landing_actions';

class LandingSearchForm extends Component {
  _onSelectItem(item) {
    if (this.props.searchType === 'Colonia') {
      this.props.onSetColonia(item);
    } else if (this.props.searchType === 'Vivienda') {
      this.props.onSetVivienda(item);
    }
  }

  render() {
    return (
      <SuggestionsInputField
        searchType={this.props.searchType}
        onSelectItem={this._onSelectItem.bind(this)}
        placeholder={this.props.placeholder}
        specificGroupClass={'landing-search-form'}
        specificInputClass={'form-control ' + this.props.searchType}/>
    );
  }
}

export default connect(null, { onSetColonia, onSetVivienda })(LandingSearchForm);
