import React      from 'react';
import jsdom      from 'mocha-jsdom';
import TestUtils  from 'react-addons-test-utils';
import { expect } from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = TestUtils

import SuggestionsDropdown from '../../../client/scripts/components/SuggestionsDropdown';

describe('SuggestionsDropdown Component', () => {
  jsdom();
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
    }
  ];

  it('should render suggestions list', () => {
    const selectMItem = () => {};

    const component = renderIntoDocument(
      <SuggestionsDropdown selectMItem={selectMItem} items={suggests}/>
    );

    const suggestions = scryRenderedDOMComponentsWithClass(component, 'im-menu-item');

    expect(suggestions[0].textContent).to.equal('Condesa');
    expect(suggestions[1].textContent).to.equal('Polanco');
  });

  it('should select an element when is clicked', () => {
    let selectedItem = {};
    const expectedItem = {
      id: 2,
      content: 'Polanco',
      highlights: 'Polanco'
    }

    const selectMItem = (item) => {
      selectedItem = item;
    };

    const component = renderIntoDocument(
      <SuggestionsDropdown selectMItem={selectMItem} items={suggests}/>
    );

    const suggestions = scryRenderedDOMComponentsWithClass(component, 'im-menu-item');
    Simulate.click(suggestions[1]);

    expect(selectedItem).to.not.eql({});
    expect(selectedItem).to.eql(expectedItem);
  });

  it('should highlight element when it is already selected', () => {
    const selectedSuggestion = {
      id: 2,
      content: 'Polanco',
      highlights: 'Polanco'
    }

    const selectMItem = () => {};
    const component = renderIntoDocument(
      <SuggestionsDropdown
        selectedSuggestion={selectedSuggestion}
        selectMItem={selectMItem}
        items={suggests} />
    );

    const suggestions = scryRenderedDOMComponentsWithClass(component, 'im-menu-item');

    expect(suggestions[0].className).to.not.eql('im-menu-item hover')
    expect(suggestions[1].className).to.eql('im-menu-item hover')
  });
});