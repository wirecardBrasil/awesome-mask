export const isCharacterKeyPress = (ev) => {
  let isKeyPress = false
  if (typeof ev.which == 'undefined') {
    isKeyPress = true;
  } else if (typeof ev.which == 'number' && ev.which > 0) {
    return !ev.ctrlKey && !ev.metaKey && !ev.altKey && ev.which != 8;
  }
  return isKeyPress;
}
