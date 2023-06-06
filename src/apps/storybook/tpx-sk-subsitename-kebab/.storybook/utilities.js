export const getKeyByValue = (obj, value) =>
  Object.keys(obj).find((key) => obj[key] === value && key);

export const replaceObjectKey = (obj, oldKey, newKey) =>
  Object.fromEntries(
    Object.entries(obj).map(([objectKey, objectValue]) => {
      if (objectKey === oldKey) return [newKey, objectValue];
      return [objectKey, objectValue];
    })
  );

export const convertObjectKeys = (obj, prefix = '', suffix = '', conversionType = String) =>
  Object.fromEntries(
    Object.entries(obj).map(([objectKey, objectValue]) => {
      return [conversionType(`${prefix}${objectKey}${suffix}`), objectValue];
    })
  );

export const colorShades = (color) => {
  let shades = { ...color };

  if (shades.DEFAULT) {
    const colorDefault = shades.DEFAULT;
    const colorDefaultShade = getKeyByValue(shades, colorDefault);
    delete shades.DEFAULT;
    shades = convertObjectKeys(shades, '', ' ');
    shades = replaceObjectKey(shades, `${colorDefaultShade} `, `${colorDefaultShade} (default) `);
  }

  return shades;
};
