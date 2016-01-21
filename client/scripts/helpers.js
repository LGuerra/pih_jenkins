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
  return value.toFixed().replace(/./g, function(c, i, a) {
    return i && c !== '.' && ((a.length - i) % 3) === 0 ? ',' + c : c;
  });
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

module.exports = {
  formatAsPrice: formatAsPrice,
  formatAsBigPrice: formatAsBigPrice,
  formatAsNumber: formatAsNumber,
  toTitleCase: toTitleCase
};
