import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import SearchBar from '../Components/SearchBar';
import SearchResults from '../Components/SearchResults';
import TotalResultsSlider from '../Components/TotalResultsSlider';
import { mock } from './fixtures/mockdata';

test('SearchBar renders correctly', () => {
  const onChangeMock = jest.fn();
  const tree = renderer
    .create(<SearchBar onSearchChange={onChangeMock} />)
    .toJSON();

  expect(tree.type).toBe('div');
  expect(tree.children).toHaveLength(2);
  expect(tree).toMatchSnapshot();
});

test('SearchResults renders correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <SearchResults data={mock.streams} />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree.type).toBe('ul');
  expect(tree.children).toHaveLength(3);
  expect(tree).toMatchSnapshot();
});

test('TotalResultsSlider renders correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <TotalResultsSlider />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree.type).toBe('div');
  expect(tree.children).toHaveLength(2);
  expect(tree).toMatchSnapshot();
});
