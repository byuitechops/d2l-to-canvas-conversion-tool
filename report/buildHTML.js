const getCategory = require('./getCategoryTemplate.js');
const getTableRow = require('./getTableRow.js');

module.exports = (logs) => {

    var category = getCategory(logs);

    var rows = logs.map(log => getTableRow(log));

    category.replace('REPLACEME', rows.join(''));


};