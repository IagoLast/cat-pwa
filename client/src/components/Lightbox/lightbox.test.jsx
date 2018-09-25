import React from 'react';
import renderer from 'react-test-renderer';

import Lightbox from './Lightbox';

it('renders correctly', () => {
  const data = {
    datetaken: 'fake-date-taken',
    url_l: 'fake-url',
    title: 'fake-title',
    ownername: 'fake-ownername',
    ownername: 'fake-tags_0, fake-tags_1',
  }
  const tree = renderer.create(<Lightbox handleClick={console.log} data={data}></Lightbox>).toJSON();
  expect(tree).toMatchSnapshot();
});