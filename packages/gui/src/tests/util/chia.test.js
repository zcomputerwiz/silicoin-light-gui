const silicoin = require('../../util/silicoin');

describe('silicoin', () => {
  it('converts number mojo to silicoin', () => {
    const result = silicoin.mojo_to_silicoin(1000000);

    expect(result).toBe(0.000001);
  });
  it('converts string mojo to silicoin', () => {
    const result = silicoin.mojo_to_silicoin('1000000');

    expect(result).toBe(0.000001);
  });
  it('converts number mojo to silicoin string', () => {
    const result = silicoin.mojo_to_silicoin_string(1000000);

    expect(result).toBe('0.000001');
  });
  it('converts string mojo to silicoin string', () => {
    const result = silicoin.mojo_to_silicoin_string('1000000');

    expect(result).toBe('0.000001');
  });
  it('converts number silicoin to mojo', () => {
    const result = silicoin.silicoin_to_mojo(0.000001);

    expect(result).toBe(1000000);
  });
  it('converts string silicoin to mojo', () => {
    const result = silicoin.silicoin_to_mojo('0.000001');

    expect(result).toBe(1000000);
  });
  it('converts number mojo to colouredcoin', () => {
    const result = silicoin.mojo_to_colouredcoin(1000000);

    expect(result).toBe(1000);
  });
  it('converts string mojo to colouredcoin', () => {
    const result = silicoin.mojo_to_colouredcoin('1000000');

    expect(result).toBe(1000);
  });
  it('converts number mojo to colouredcoin string', () => {
    const result = silicoin.mojo_to_colouredcoin_string(1000000);

    expect(result).toBe('1,000');
  });
  it('converts string mojo to colouredcoin string', () => {
    const result = silicoin.mojo_to_colouredcoin_string('1000000');

    expect(result).toBe('1,000');
  });
  it('converts number colouredcoin to mojo', () => {
    const result = silicoin.colouredcoin_to_mojo(1000);

    expect(result).toBe(1000000);
  });
  it('converts string colouredcoin to mojo', () => {
    const result = silicoin.colouredcoin_to_mojo('1000');

    expect(result).toBe(1000000);
  });
});
