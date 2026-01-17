import { normalizeUnit } from '../../src/shared/units';

describe('normalizeUnit', () => {
  it('returns canonical values for aliases', () => {
    expect(normalizeUnit('gram')).toBe('g');
    expect(normalizeUnit('GrAmS')).toBe('g');
    expect(normalizeUnit('pieces')).toBe('pcs');
    expect(normalizeUnit('liter')).toBe('l');
    expect(normalizeUnit('kiste')).toBe('crate');
    expect(normalizeUnit('KISTEN')).toBe('crate');
    expect(normalizeUnit('flasche')).toBe('bottle');
    expect(normalizeUnit('Flaschen')).toBe('bottle');
    expect(normalizeUnit('dose')).toBe('can');
    expect(normalizeUnit('Dosen')).toBe('can');
    expect(normalizeUnit('packung')).toBe('pack');
    expect(normalizeUnit('Packungen')).toBe('pack');
  });

  it('returns canonical for canonical inputs', () => {
    expect(normalizeUnit('slice')).toBe('slice');
    expect(normalizeUnit('g')).toBe('g');
  });

  it('returns undefined for unknown units', () => {
    expect(normalizeUnit('weirdunit')).toBeUndefined();
  });
});
