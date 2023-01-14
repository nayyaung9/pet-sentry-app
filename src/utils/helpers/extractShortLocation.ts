export const extractShortLocation = (value: string) => {
  const getShortAddress = value?.split(",");
  return `${getShortAddress[0]},${getShortAddress[2]}`;
}

// var str = "Tamwe,ပြုံးပြုံးလေး တိုက်Awbar Street, Yangon, 00923, Myanmar";
// var parts = str.split(',');
// alert(parts[2]);