import { FormatIdPipe } from './format-id.pipe';

describe('FormatIdPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatIdPipe();
    expect(pipe).toBeTruthy();
  });

  it('Testing transform() - (Empty value)', () => {
    const pipe = new FormatIdPipe();
    pipe.transform();
  });
});
