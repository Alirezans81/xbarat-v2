async function combineImagesWithGrid(
  images,
  layout,
  cellSize = 200,
  padding = 0,
  bgColor = "white"
) {
  if (images.length !== layout.length)
    throw new Error("The number of images and layout items must match.");

  const bitmaps = await Promise.all(
    images.map((img) => createImageBitmap(img))
  );

  const totalCols = Math.max(...layout.map((item) => item.col + item.colSpan));
  const totalRows = Math.max(...layout.map((item) => item.row + item.rowSpan));

  const canvasWidth = totalCols * cellSize + (totalCols - 1) * padding;
  const canvasHeight = totalRows * cellSize + (totalRows - 1) * padding;

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  layout.forEach((item, i) => {
    const x = item.col * (cellSize + padding);
    const y = item.row * (cellSize + padding);
    const w = item.colSpan * cellSize + (item.colSpan - 1) * padding;
    const h = item.rowSpan * cellSize + (item.rowSpan - 1) * padding;
    ctx.drawImage(bitmaps[i], x, y, w, h);
  });

  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob), "image/png")
  );
}
function dataURLToBlob(dataURL) {
  const [header, base64] = dataURL.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

export { combineImagesWithGrid, dataURLToBlob };
