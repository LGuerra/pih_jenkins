import React      from 'react';
import jsdom      from 'mocha-jsdom';
import TestUtils  from 'react-addons-test-utils';
import { expect } from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = TestUtils;

import IconSelector from '../../../client/scripts/components/IconSelector';

describe('IconSelector Component', () => {
  jsdom();
  const icons = [{
      label: 'Casa',
      icon: 'house',
      value: 2
    },
    {
      label: 'Departamento',
      icon: 'apartment',
      value: 4
    }];


  it('should render icon selector depending on icons in props', () => {
    const component = renderIntoDocument(
      <IconSelector
        unit={'id_tipo_propiedad'}
        icons={icons}
      />
    );

    const iconSelectors = scryRenderedDOMComponentsWithClass(component, 'icon');

    expect(iconSelectors.length).to.equal(2);
  });

  it('should select the defaultIcon', () => {
    const expectedClass = 'icon is_active';
    const defaultIcon = 4;
    const component = renderIntoDocument(
      <IconSelector
        unit={'id_tipo_propiedad'}
        icons={icons}
        defaultIcon={defaultIcon}
      />
    );

    const iconSelectors = scryRenderedDOMComponentsWithClass(component, 'icon');

    expect(iconSelectors[1].className).to.equal(expectedClass);
  });

  it('should update icon selected when is clicked', () => {
    let selectedValue;
    const unit          = 'unit';
    const expectedValue = { unit: 4 };
    const expectedClass = 'icon is_active';

    const onUpdateValue = (value) => {
      selectedValue = value;
    };

    const component = renderIntoDocument(
      <IconSelector
        unit={'unit'}
        icons={icons}
        onUpdateValue={onUpdateValue}
      />
    );

    const iconSelectors = scryRenderedDOMComponentsWithClass(component, 'icon');

    Simulate.click(iconSelectors[1]);

    expect(component.state.active).to.equal(icons[1].value);
    expect(selectedValue).to.eql(expectedValue);
    expect(iconSelectors[1].className).to.equal(expectedClass);
  });
});
