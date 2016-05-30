import React      from 'react';
import jsdom      from 'mocha-jsdom';
import TestUtils  from 'react-addons-test-utils';
import { expect } from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = TestUtils

import SuggestionsInputField from '../../../client/scripts/components/SuggestionsInputField';

describe('SuggestionsInputField Component', () => {
  jsdom();
  global.IMAGES = {
    black_lupa: ''
  };
  const suggests = [
    {
      id: 1,
      content: 'Condesa',
      highlights: 'Condesa'
    },
    {
      id: 2,
      content: 'Polanco',
      highlights: 'Polanco'
    },
    {
      id: 3,
      content: 'Chapultepec',
      highlights: 'Chapultepec'
    }
  ];

  it('should invoke a callback when a suggestion is selected', () => {
    let selectedItem = {};
    const expectedItem = {
      id: 2,
      content: 'Polanco',
      highlights: 'Polanco'
    }

    const onSelectItem = (item) => {
      selectedItem = item;
    }

    const component = renderIntoDocument(
      <SuggestionsInputField
        onSelectItem={onSelectItem}/>
    );
    component.setState({
      suggests: suggests,
      selectedSuggestion: suggests[1]
    });

    const input = component.refs.input;

    Simulate.keyDown(input, {keyCode: 13})

    expect(selectedItem).to.eql(expectedItem);
  });

  it('should change input text when user navigates up/down', () => {
    const expectedValue1 = 'Polanco';
    const expectedValue2 = 'Condesa';

    const component = renderIntoDocument(
      <SuggestionsInputField />
    );

    component.setState({
      suggests: suggests
    });

    const input = component.refs.input;

    Simulate.keyDown(input, {keyCode: 40});
    Simulate.keyDown(input, {keyCode: 40});

    expect(input.value).to.eql(expectedValue1);

    Simulate.keyDown(input, {keyCode: 38});
    expect(input.value).to.eql(expectedValue2);
  });

  it('should hide suggestions field when user clicks on ESC', () => {

    const component = renderIntoDocument(
      <SuggestionsInputField />
    );

    component.setState({
      suggests: suggests,
      selectedSuggestion: suggests[1]
    });

    const input = component.refs.input;
    input.value = 'This is a new item';

    setTimeout(() => {
      expect(component.state.showDropdown).to.equal(true);
      Simulate.keyDown(input, {keyCode: 27});
      expect(component.state.showDropdown).to.equal(false);
    }, 0);
  });
});