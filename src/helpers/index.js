export function drawSelection(ctx, selection) {
  ctx.beginPath();
  ctx.lineWidth = '1';
  ctx.strokeStyle = '#666';
  ctx.rect(selection.x, selection.y, selection.w, selection.h);
  ctx.stroke();
}

export function clearPrevSelection(ctx, prevSelection) {
  if (!prevSelection) return;

  ctx.beginPath();
  ctx.lineWidth = '1';
  ctx.strokeStyle = '#fff';
  ctx.rect(prevSelection.x, prevSelection.y, prevSelection.w, prevSelection.h);
  ctx.stroke();
}

export function isHoverSelection(cursor, selection) {
  if (!cursor || !selection) return false;
  if (cursor.x < selection.x) return false;
  if (cursor.y < selection.y) return false;
  if (cursor.x > selection.x + selection.w) return false;
  if (cursor.y > selection.y + selection.h) return false;

  return true;
}

export function dragSelection(ctx, cursor, selection) {
  if (!cursor || selection) return;

  const imageData = ctx.getImageData(
    selection.x,
    selection.y,
    selection.h,
    selection.w
  );

  ctx.putImageData(imageData, cursor.x, cursor.y);
  console.log({ cursor, selection });
}
