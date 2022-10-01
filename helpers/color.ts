// Thanks vcapra1!

type HexColor = `#${string}`;

const approximateColor1ToColor2ByPercent = (
  color1: HexColor,
  color2: HexColor,
  percent: number
) => {
  var red1 = parseInt(color1[1] + color1[2], 16);
  var green1 = parseInt(color1[3] + color1[4], 16);
  var blue1 = parseInt(color1[5] + color1[6], 16);

  var red2 = parseInt(color2[1] + color2[2], 16);
  var green2 = parseInt(color2[3] + color2[4], 16);
  var blue2 = parseInt(color2[5] + color2[6], 16);

  var red = Math.round(mix(red1, red2, percent));
  var green = Math.round(mix(green1, green2, percent));
  var blue = Math.round(mix(blue1, blue2, percent));

  return generateHex(red, green, blue);
};

const generateHex = (r: number, g: number, b: number) => {
  let hexR = r.toString(16);
  let hexG = g.toString(16);
  let hexB = b.toString(16);

  while (hexR.length < 2) {
    hexR = "0" + hexR;
  }
  while (hexG.length < 2) {
    hexG = "0" + hexG;
  }
  while (hexB.length < 2) {
    hexB = "0" + hexB;
  }

  return "#" + hexR + hexG + hexB;
};

function mix(start: number, end: number, percent: number) {
  return start + percent * (end - start);
}

export default approximateColor1ToColor2ByPercent;
