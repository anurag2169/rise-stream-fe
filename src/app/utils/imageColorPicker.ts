import { extractColors } from "extract-colors";

export const extractAndSetGradient = async (src: any) => {
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src + "?not-from-cache-please";

    const colorArray = await extractColors(img.src);

    const topColors =
      colorArray.length >= 4 ? colorArray.slice(0, 4) : colorArray;

    const gradientColors = topColors.map((color) => color.hex).join(", ");

    const newGradientStyle = {
      background: `linear-gradient(to top, ${gradientColors})`,
    };
    return newGradientStyle;
  } catch (error) {
    console.error(error);
    return {
      background: `linear-gradient(to top, #a2c2e2, #ffffff)`,
    };
  }
};
