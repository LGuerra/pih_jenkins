import React      from 'react';
import jsdom      from 'mocha-jsdom';
import TestUtils  from 'react-addons-test-utils';
import { expect } from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = TestUtils;

import ValuePicker from '../../../client/scripts/components/ValuePicker';

describe('ValuePicker Component', () => {
  jsdom();
  const lowerLimit    = 1;
  const upperLimit    = 5;
  const steps         = 1;
  const defaultActive = 3;

  it('should render the number of values depending on limits and steps defined', () => {
    const component = renderIntoDocument(
      <ValuePicker
        lowerLimit={lowerLimit}
        upperLimit={upperLimit}
        steps={steps}
        defaultActive={defaultActive}
      />
    );

    const values = scryRenderedDOMComponentsWithClass(component, 'selector');
    const expectedNumber = ((upperLimit - lowerLimit) / steps) + 1;

    expect(values.length).to.eql(expectedNumber);
    expect(values[0].textContent).to.equal(lowerLimit.toString());
  });

  it('should select the defaultActive value', () => {
    const expectedClass = 'selector active specificClass';

    const component = renderIntoDocument(
      <ValuePicker
        lowerLimit={lowerLimit}
        upperLimit={upperLimit}
        steps={steps}
        specificClass={'specificClass'}
        defaultActive={defaultActive}
      />
    );

    const values = scryRenderedDOMComponentsWithClass(component, 'selector');

    expect(values[2].className).to.eql(expectedClass);
  });

  it('should change active value when is clicked', () => {
    const unit              = 'unit';
    const expectedClass     = 'selector active specificClass';
    const expectedUnitValue = { unit: 3 };
    let selectedValue;

    const onUpdateValue = (value) => {
      selectedValue = value;
    };

    const component = renderIntoDocument(
      <ValuePicker
        unit={unit}
        lowerLimit={lowerLimit}
        upperLimit={upperLimit}
        steps={steps}
        specificClass={'specificClass'}
        defaultActive={defaultActive}
        onUpdateValue={onUpdateValue}
      />
    );

    const values = scryRenderedDOMComponentsWithClass(component, 'selector');
    Simulate.click(values[2]);

    expect(values[2].className).to.eql(expectedClass);
    expect(selectedValue).to.eql(expectedUnitValue);
  });
});