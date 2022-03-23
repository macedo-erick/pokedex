import { FormatTextPipe } from './format-text.pipe';

describe('formatTextPipe', () => {
  let formatTextPipe: FormatTextPipe;

  beforeEach(() => {
    formatTextPipe = new FormatTextPipe();
  });

  it('Shoud be instancied', () => {
    expect(formatTextPipe).toBeDefined();
  })

  it('create an instance', () => {
    const pipe = new FormatTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should transform clear string', ()=> {
      const string = 'Test\nString';
      const formated = formatTextPipe.transform(string)

      expect(formated).toBe('Test String')
  });

  it('Should transform special string', ()=> {
    const string = 'Test\nString\f';
    const formated = formatTextPipe.transform(string)

    expect(formated).toBe('Test String')
});


});
