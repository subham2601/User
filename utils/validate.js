module.exports = {
  isAValidPhoneNumber(number) {
    return /^[\d\+\-\(\) ]+$/.test(number);
  },
};
