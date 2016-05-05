import React      from 'react';
import jsdom      from 'mocha-jsdom';
import TestUtils  from 'react-addons-test-utils';
import { expect } from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = TestUtils;

import InputFieldForm from '../../../client/scripts/components/InputFieldForm';

describe('InputFieldForm Component', () => {
  jsdom();
  const min = 0;
  const max = 10;
  const defaultValue = 5;

  it('should render input field with defaultValue', () => {
    const component = renderIntoDocument(
      <InputFieldForm
        min={min}
        max={max}
        defaultValue={defaultValue}
      />
    );

    const input = component.refs.input;

    expect(input.value).to.equal(defaultValue.toString());
  });

  it('should invoke a callback when it is changed', () => {
    const unit = 'unit';
    let selectedValue;
    const expectedValue = { unit: '10' };
    const onUpdateValue = (value) => {
      selectedValue = value;
    };

    const component = renderIntoDocument(
      <InputFieldForm
        min={min}
        max={max}
        unit={unit}
        onUpdateValue={onUpdateValue}
        defaultValue={defaultValue}
      />
    );

    const input = component.refs.input;
    input.value = '10';
    Simulate.change(input);

    expect(selectedValue).to.eql(expectedValue);
  });
});