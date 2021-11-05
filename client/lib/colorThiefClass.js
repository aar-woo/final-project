import ColorThief from 'colorthief';

const colorThief = new ColorThief();

export default class getColors {
  constructor(img) {
    this.img = img;
  }

  getRgbArr(img) {
    const rgbArr = colorThief.getColor(img);
    return rgbArr;
  }

  getRgb(img) {
    const rgbArr = colorThief.getColor(img);
    const rgbJoin = rgbArr.join(', ');
    const rgb = `(${rgbJoin})`;
    return rgb;
  }

  getSecondaryRgbArr(img) {
    const palette = colorThief.getPalette(img);
    const secondaryRgbArr = palette[0];
    return secondaryRgbArr;
  }

  getPaletteRgb(img) {
    const palette = [];
    const paletteRaw = colorThief.getPalette(img);
    for (let i = 0; i < 2; i++) {
      palette.push(`(${paletteRaw[i].join(', ')})`);
    }
    return palette;
  }

}
