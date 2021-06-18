export const getImage = (img1, img2, img3) => {
  if (img1 && img1 !== "/" && img1.includes("http")) return img1;
  if (img2 && img2 !== "/" && img2.includes("http")) return img2;
  return img3;
};
