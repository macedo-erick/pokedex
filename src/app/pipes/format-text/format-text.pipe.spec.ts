import { FormatTextPipe } from './format-text.pipe';

describe('formatTextPipe', () => {
  let formatTextPipe: FormatTextPipe;

  beforeEach(() => {
    formatTextPipe = new FormatTextPipe();
  });

  it('Should be instancied', () => {
    expect(formatTextPipe).toBeDefined();
  });

  it('create an instance', () => {
    const pipe = new FormatTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('Testing transform() - (Clear string)', () => {
    const string = 'Testing\nString';
    const formated = formatTextPipe.transform(string);

    expect(formated).toBe('Testing String');
  });

  it('Testing transform() - (Special string)', () => {
    const string = 'Testing\nString\f';
    const formated = formatTextPipe.transform(string);

    expect(formated).toBe('Testing String ');
  });

  it('Testing transform() - (Empty value)', () => {
    formatTextPipe.transform();
  });
});
