export default function categorizeColor(hslArr) {
  const hue = hslArr[0];
  const sat = hslArr[1];
  const lgt = hslArr[2];
  const colorCategory = {
    color: null,
    id: null
  };
  if (lgt < 15) {
    colorCategory.color = 'black';
    colorCategory.id = 1;
  } else if (lgt > 80) {
    colorCategory.color = 'white';
    colorCategory.id = 2;
  } else if (sat < 20) {
    colorCategory.color = 'grey';
    colorCategory.id = 3;
  } else if (hue < 30) {
    colorCategory.color = 'red';
    colorCategory.id = 4;
  } else if (hue < 90) {
    colorCategory.color = 'yellow';
    colorCategory.id = 5;
  } else if (hue < 150) {
    colorCategory.color = 'green';
    colorCategory.id = 6;
  } else if (hue < 230) {
    colorCategory.color = 'cyan';
    colorCategory.id = 7;
  } else if (hue < 270) {
    colorCategory.color = 'blue';
    colorCategory.id = 8;
  } else if (hue < 330) {
    colorCategory.color = 'magenta';
    colorCategory.id = 9;
  } else {
    colorCategory.color = 'red';
    colorCategory.id = 4;
  }

  return colorCategory;
}
