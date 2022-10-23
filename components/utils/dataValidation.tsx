export const dataValidation = (info: any): boolean => {
  const data = Object.keys(info);

  let check: boolean = true;

  for (let key of data) {
    if (info[key] === "" || info[key] === 0) {
      check = false;
    }
  }

  return check;
};
