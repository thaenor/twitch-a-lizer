import React from "react";
import renderer from "react-test-renderer";
import SearchBar from "../Components/SearchBar";

test("Link renders correctly", () => {
  const onChangeMock = jest.fn();
  const tree = renderer
    .create(<SearchBar onSearchChange={onChangeMock} />)
    .toJSON();

  expect(tree.type).toBe("div");
  expect(tree.children).toHaveLength(2);
  expect(tree).toMatchSnapshot();
});
