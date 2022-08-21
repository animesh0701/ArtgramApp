export default function makeid(length) {
  let result = "";
  let ID = (length = 6) => {
    return new Date().getTime().toString().slice(-length);
  };
  result = ID(length);
  return result;
}
