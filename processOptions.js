const options = {
  online: 'online',
  campus: 'campus',
  A: true,
  O: true,
  D: true
};

module.exports = (callback) => {
  var settings = {
    debug: 'true',
    readAll: 'true',
    platform: 'online'
  };

  console.log(process.argv);
  count = 0;
  process.argv.forEach((arg, index) => {
    if (index < 2) {
      return true;
    }
    value = arg.split('-')[1];
    if (Object.keys(options).includes(value)) {
      settings[value] = options[value];
    }
  });
  return settings;
};
