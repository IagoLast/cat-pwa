import React from 'react';
import renderer from 'react-test-renderer';

import Figure from './Figure';

it('renders correctly', () => {
  const data = {
    width_s: '300px',
    height_s: '300px',
    url_s: 'fake-url',
    title: 'fake-title',
    ownername: 'fake-ownername'
  }
  const tree = renderer.create(<Figure data={data}></Figure>).toJSON();
  expect(tree).toMatchSnapshot();
});