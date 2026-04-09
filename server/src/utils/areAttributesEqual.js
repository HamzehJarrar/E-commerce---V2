const areAttributesEqual = (attributes1, attributes2) => {
  if (!attributes1 || !attributes2) return false;
  const toArray = (attrs) => {
    if (attrs instanceof Map) {
      return Array.from(attrs, ([name, value]) => ({ name, value }));
    } else if (Array.isArray(attrs)) {
      return attrs;
    } else if (typeof attrs === "object") {
      return Object.entries(attrs).map(([name, value]) => ({ name, value }));
    } else {
      return [];
    }
  };

  const arr1 = toArray(attributes1);
  const arr2 = toArray(attributes2);

  if (arr1.length !== arr2.length) return false;

  for (const attr1 of arr1) {
    const attr2 = arr2.find((a) => a.name === attr1.name);
    if (!attr2) return false;
    if (attr1.value !== attr2.value) return false;
  }

  return true;
};

export default areAttributesEqual;
