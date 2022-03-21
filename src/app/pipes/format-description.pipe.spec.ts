import { FormatDescriptionPipe } from './format-description.pipe';

describe('FormatDescriptionPipe', () => {
  let formatDescriptionPipe: FormatDescriptionPipe;

  beforeEach(() => {
    formatDescriptionPipe = new FormatDescriptionPipe();
  });

  it('Shoud be instancied', () => {
    expect(formatDescriptionPipe).toBeDefined();
  })

  it('create an instance', () => {
    const pipe = new FormatDescriptionPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should transform clear string', ()=> {
      const string = 'Test String';
      const formated = formatDescriptionPipe.transform(string)

      expect(formated).toBe('Test String')
  });

  it('Should transform special string', ()=> {
    const string = 'Test\n String\f';
    const formated = formatDescriptionPipe.transform(string)

    expect(formated).toBe('Test String')
});


});
