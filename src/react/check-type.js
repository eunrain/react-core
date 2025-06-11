export function isPrimitiveType(node) {
  return typeof node === 'string' || typeof node === 'number';
}
