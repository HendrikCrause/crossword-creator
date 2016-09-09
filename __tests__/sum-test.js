jest.unmock('../src/sum')

import sum from '../src/sum'

describe('sum', () => {
  it('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
});
