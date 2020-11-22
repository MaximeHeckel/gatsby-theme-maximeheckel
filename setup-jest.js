import 'jest-dom/extend-expect';

global.___loader = {
  enqueue: jest.fn(),
};
global.__BASE_PATH__ = ``;

if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 1;
}

// const observe = jest.fn();
// const unobserve = jest.fn();

// // you can also pass the mock implementation
// // to jest.fn as an argument
// window.IntersectionObserver = jest.fn(() => ({
//   observe,
//   unobserve,
// }));
