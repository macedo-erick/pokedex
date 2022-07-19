import { FormatValuePipe } from './format-value.pipe';

describe('FormatValuePipe', () => {
  let formatValuePipe: FormatValuePipe;

  beforeEach(() => {
    formatValuePipe = new FormatValuePipe();
  });

  it('create an instance', () => {
    const pipe = new FormatValuePipe();
    expect(pipe).toBeTruthy();
  });

  it('Testing transform() - (value < 100)', () => {
    const value = 10;
    const formated = formatValuePipe.transform(value);
    expect(formated).toEqual(5);
  });

  it('Testing transform() - (value > 100)', () => {
    const value = 100;
    const formated = formatValuePipe.transform(value);

    expect(formated).toEqual(10);
  });
});
