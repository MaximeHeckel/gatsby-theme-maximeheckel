import 'jest-dom/extend-expect';

global.___loader = {
  enqueue: jest.fn(),
};
global.__BASE_PATH__ = ``;

if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 1;
}
