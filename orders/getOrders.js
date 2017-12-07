const https = require('https');
const d3 = require('d3-dsv');

module.exports = (finalCallback) => {

    function getOrders(callback) {
        https.get(
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vSwysddQcr7DHs3PZxxkb-qxGK-FfFP5BJ4Sp8a-T0LeZufOACR0AcYX408uIxffi1r4S2QPFBDo8Rj/pub?gid=96971044&single=true&output=csv',
            res => {
                if (res.statusCode !== 200) {
                    console.error('Request to get Course Orders failed. Status code: ' + res.statusCode);
                } else {
                    res.setEncoding('utf8');
                    res.on('data', chunk => {
                        var orders = d3.csvParse(chunk);
                        orders = orders.filter(order => order.Complete != 'TRUE');
                        callback(orders);
                    });
                }
            });
    }

    getOrders(orders => {
        orders.forEach(order => {
            order.courseOU = order['What is the course OU number? '];
            order.platform = order['Is this for a Pathway course?'];
        });
        finalCallback(orders);
    });

}
