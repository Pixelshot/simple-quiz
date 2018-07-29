import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: [
      "The Shining",
      "IT",
      "David Copperfield",
      "A Tale of Two Cities",
      "Hamlet",
      "Macbeth",
      "Romeo and Juliet"
    ],
    author: {
      name: "Charles Dickens",
      imageUrl: "images/authors/charlesdickens.jpg",
      imageSource: "Wikimedia Commons",
      books: ["David Copperfield", "A Tale of Two Cities"]
    }
  },
  highlight: "none"
};

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App {...state} onAnswerSelected={() => {}} />, div);
  });

  describe("When no answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<App {...state} onAnswerSelected={() => {}} />); // This is to check if highlight: none
    });

    it("should not have background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        ""
      );
    });
  });

  describe("When the correct answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <App
          {...Object.assign({}, state, { highlight: "correct" })}
          onAnswerSelected={() => {}}
        />
      ); // I'm sure there's a better way to assign but for now this will
    });

    it("should have a green background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        "green"
      );
    });
  });

  describe("When the wrong answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <App
          {...Object.assign({}, state, { highlight: "wrong" })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        "red"
      );
    });
  });

  describe("When the first answer is selected", () => {
    let wrapper;
    const handleAnswerSelected = jest.fn(); // jest.fn creates a mock function

    beforeAll(() => {
      wrapper = mount(
        <App {...state} onAnswerSelected={handleAnswerSelected} />
      );
      wrapper
        .find(".answer")
        .first()
        .simulate("click");
    });

    it("onAnswerSelected function should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
      // Because handleAnswerSelected is a jest function, we can use toHaveBeenCalled expectation.
      // This means the test will fail if our callback function has not been called.
    });

    // Testing the value that's being passed to handleAnswerSelected.
    // Should receive The Shining because it's the first book found in books array.
    it("should receive The Shining", () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
    });
  });
});
