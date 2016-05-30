import React, { Component } from 'react';
import { isEqual } from 'lodash';
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

  componentDidUpdate(prevProps) {
    if(!isEqual(prevProps.colonia, this.props.colonia)) {
      if (this.props.triggerOnChange) {
        this.props.triggerOnChange();
      }
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

function mapStateToProps(state) {
  return {
    colonia: state.landing.colonia
  }
}

export default connect(mapStateToProps, { onSetColonia, onSetVivienda })(LandingSearchForm);
