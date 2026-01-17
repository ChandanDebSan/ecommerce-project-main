import { convertCents } from '../../scripts/money.js'

describe('Test suite : Format currency' , () =>{
  it('converts cents into dollars' , () => {
    expect(convertCents(2095)).toEqual('20.95');
  });

  it('Works with 0' , () => {
    expect(convertCents(0)).toEqual('0.00');
  });

  it('works with decimel numbers' , () => {
    expect(convertCents(2000.5)).toEqual('20.01')
  });
});
convertCents