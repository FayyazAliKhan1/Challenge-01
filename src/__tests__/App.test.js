import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import Header from "../components/Header";
import Search from "../components/Search";
import { renderWithProviders } from "../../utils/utils-for-tests";

test("renders App component with children", () => {
  const { getByTestId } = renderWithProviders(<App />);
  const headerElement = getByTestId("header");
  const gistListElement = getByTestId("gist-list");
  const globalStylesElement = getByTestId("global-styles");

  expect(headerElement).toBeInTheDocument();
  expect(gistListElement).toBeInTheDocument();
  expect(globalStylesElement).toBeInTheDocument();
});

test("renders Header component with children", () => {
  const { getByTestId } = render(<Header />);
  const octiconElement = getByTestId("octicon");
  const searchElement = getByTestId("search");

  expect(octiconElement).toBeInTheDocument();
  expect(searchElement).toBeInTheDocument();
});

test("renders Search component with input box and search icon", () => {
  const { getByTestId } = render(<Search />);
  const inputBoxElement = getByTestId("input-box");
  const searchIconElement = getByTestId("search-icon");

  expect(inputBoxElement).toBeInTheDocument();
  expect(searchIconElement).toBeInTheDocument();
});

test("search input field value updates on change", () => {
  const { getByTestId } = render(<Search />);
  const inputElement = getByTestId("search-input");

  fireEvent.change(inputElement, { target: { value: "haseebahmed111" } });

  expect(inputElement.value).toBe("haseebahmed111");
});

test("dispatches fetchUserGists action when the form is submitted", () => {
  const { getByTestId } = render(<Search />);
  const inputElement = getByTestId("search-input");
  const formElement = getByTestId("search-form");

  fireEvent.change(inputElement, { target: { value: "haseebahmed111" } });
  fireEvent.submit(formElement);
});
