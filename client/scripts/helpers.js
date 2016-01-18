function formatAsPrice(value) {
  var prefix = value < 0 ? '-' : '';
  var newValue = Math.abs(value);
  return prefix + '$' + newValue.toFixed().replace(/./g, function(c, i, a) {
    return i && c !== '.' && ((a.length - i) % 3) === 0 ? ',' + c : c;
  });
}

function formatAsBigPrice(value) {
  value = value / 1000000;
  return '$' + value.toFixed().replace(/./g, function(c, i, a) {
    return i && c !== '.' && ((a.length - i) % 3) === 0 ? ',' + c : c;
  }) + ' MDP';
}

function formatAsNumber(value) {
  console.log('Value',value);
  return value.toFixed().replace(/./g, function(c, i, a) {
    return i && c !== '.' && ((a.length - i) % 3) === 0 ? ',' + c : c;
  });
}


module.exports = {
  formatAsPrice: formatAsPrice,
  formatAsBigPrice: formatAsBigPrice,
  formatAsNumber: formatAsNumber
};
