import { RandomBetween } from './RandomBetween';

const randomSpy = jest.spyOn(Math, 'random');

describe('RandomBetween', () => {
  describe('When Math.random() returns 0', () => {
    beforeEach(() => {
      randomSpy.mockReturnValue(0);
    });
    it('called with min=3 and max=5 return 3', () => {
      expect(RandomBetween(3, 5)).toBe(3);
      expect(Math.random).toHaveBeenCalledTimes(1);
    });
  });

  describe('When Math.random() returns 0.999999', () => {
    beforeEach(() => {
      randomSpy.mockReturnValue(0.999999);
    });
    it('called with min=3 and max=5 return 4', () => {
      expect(RandomBetween(3, 5)).toBe(5);
    });
  });
});
