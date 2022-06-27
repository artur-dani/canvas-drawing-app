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
