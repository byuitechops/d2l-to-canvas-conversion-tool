const downloader = require('d2l-course-downloader'),
    argv = require('yargs').argv,
    conversion = require('./main.js'),
    asyncLib = require('async'),
    chalk = require('chalk'),
    path = require('path'),
    fs = require('fs'),
    childProcess = require('child_process').spawn,
    getOrders = require('./orders/getOrders.js'),
    {
        shell
    } = require('electron');

var badCols = [
    'Complete',
    'courseOU',
    'platform'
];

var progAnims = {
    preparation: document.getElementById('preparing'),
    preImport: document.getElementById('pre-import'),
    import: document.getElementById('importing'),
    postImport: document.getElementById('post-import'),
    cleanup: document.getElementById('cleanup')
};

function buildSettings() {
    return {
        settings: {
            debug: document.querySelector('#debug').checked,
            readAll: document.querySelector('#readAll').checked,
            online: document.querySelector('#online').checked,
            keepFiles: document.querySelector('#keepFiles').checked,
            deleteCourse: document.querySelector('#deleteCourse').checked,
            useDownloader: document.querySelector('#useDownloader').checked
        }
    }
}

function buildPromptData() {
    return {
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value,
        domain: document.querySelector('#online').checked ? 'pathway' : 'byui'
    };
}

function buildChildModules() {
    var childLabels = document.querySelectorAll('.child-mods-container label');
    var childModules = [];
    childLabels.forEach(label => {
        if (label.children[0].checked) {
            childModules.push(label.getAttribute('for'))
        }
    });
    console.log(childModules);
    return childModules;
}

function startConversion(courses) {
    asyncLib.eachSeries(courses, conversion, (err, resultCourses) => {
        if (err) {
            console.log(chalk.red('\nError writing report to report.json'));
        }
        console.log('\nFinal report written to report.json');
        document.getElementById('startButton').disabled = false;
    })
}

function openSheet(url) {
    shell.openExternal(url);
}

function formatMessage(message) {
    message = message.replace(/SUCCESS\s/g, '<span style="color:#00CD3B">[SUCCESS]</span>&nbsp;');
    message = message.replace(/ERROR\s/g, '<span style="color:#800000">[ERROR]</span>&nbsp;');
    message = message.replace(/FATALERR\s/g, '<span style="color:red">[FATALERR]</span>&nbsp;');
    message = message.replace(/WARNING\s/g, '<span style="color:#F0D426">[WARNING]</span>&nbsp;');
    message = message.replace(/LAUNCHED/g, '<span style="color:blue">[LAUNCHED]</span>');
    message = message.replace(/Import Progress/g, '<span style="color:blue">Import Progress</span>');
    message = message.replace(/Canvas migration status/g, '<strong>Canvas Migration Status</strong>');
    message = message.replace(/Downloaded: /g, '<strong>Downloaded: </strong>');
    message = message.replace(/Bytes: /g, '<strong>Bytes: </strong>');
    message = message.replace(/\n/g, '<br>');
    message = message.replace(/\s/g, '&nbsp;');
    message = message.replace(/n&nbsp;s/g, 'n s');
    return message;
}

function changeSpinners(oldEle, newEle) {
    oldEle.classList.remove('is-active');
    oldEle.innerHTML = `<i class="material-icons blue">check_circle</i>`;
    if (newEle) {
        newEle.classList.add('is-active');
    }
}

function checkMessage(message) {
    if (message.includes('Preparation processes completed successfully')) {
        changeSpinners(progAnims.preparation, progAnims.preImport);
    } else if (message.includes('Pre-Import processes completed successfully')) {
        changeSpinners(progAnims.preImport, progAnims.import);
    } else if (message.includes('Import Course processes completed successfully')) {
        changeSpinners(progAnims.import, progAnims.postImport);
    } else if (message.includes('Post-Import processes completed successfully')) {
        changeSpinners(progAnims.postImport, progAnims.cleanup);
    } else if (message.includes('https://byui.instructure.com/courses/')) {
        changeSpinners(progAnims.cleanup, null);
        document.getElementById('course-link').innerHTML =
        `<a onclick="openSheet('${message.split('Course: ')[1].split(' FINAL REPORT')[0].trim()}')">
            ${message.split('Course: ')[1].split(' FINAL REPORT')[0].trim()}
        </a>`;
    }
}

function runConversion() {
    document.getElementById('startButton').disabled = true;
    progAnims.preparation.classList.add('is-active');
    var promptData = buildPromptData();
    var settings = buildSettings();
    var dataObj = Object.assign(settings, promptData);
    fs.writeFile('./userInterface/tmp.json', JSON.stringify(dataObj), err => {
        if (err) console.error(err);
        else {

            var cp = childProcess('node ' + path.resolve('.', './orders/getOrdersUI.js'), {
                stdio: 'pipe',
                shell: true,
                // detached: true
            }, (err, stdout, stderr) => {
                if (err) console.error(err);
                else {
                    console.log('Complete');
                }
            });

            cp.stdout.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });

            cp.stdout.on('data', (data) => {
                if (data) {
                    document.getElementById('output').innerHTML += formatMessage(data.toString());
                    checkMessage(data.toString());
                    console.log(data.toString());
                }
            });

            cp.stderr.on('data', (data) => {
                if (data) {
                    console.log(data.toString());
                }
            });
        }
    });
}

function runSingleConversion() {
    document.getElementById('runCourse').disabled = true;
    progAnims.preparation.classList.add('is-active');
    var promptData = buildPromptData();
    var dataObj = {
        settings: buildSettings(),
        childModules: buildChildModules()
    };
    dataObj.ous = [document.querySelector('#courseOU').value];;
    dataObj = Object.assign(promptData, dataObj);
    fs.writeFile('./userInterface/tmp.json', JSON.stringify(dataObj), err => {
        if (err) console.error(err);
        else {

            var cp = childProcess('node ' + path.resolve('.', './userInterface/runCourse.js'), {
                stdio: 'pipe',
                shell: true,
                // detached: true
            }, (err, stdout, stderr) => {
                if (err) console.error(err);
                else {
                    console.log('Complete');
                }
            });

            cp.stdout.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });

            cp.stdout.on('data', (data) => {
                if (data) {
                    document.getElementById('output').innerHTML += formatMessage(data.toString());
                    checkMessage(data.toString());
                    console.log(data.toString());
                }
            });

            cp.stderr.on('data', (data) => {
                if (data) {
                    console.log(data.toString());
                }
            });
        }
    });
}

var open = false;
function openClose() {
    var popout = document.getElementById('output');
    if (!open) {
        open = true;
        popout.style.right = 0;
        document.querySelector('.openClose').innerHTML = `<i class="material-icons">keyboard_arrow_right</i>`;
    } else {
        open = false;
        popout.style.right = '-760px';
        document.querySelector('.openClose').innerHTML = `<i class="material-icons">keyboard_arrow_left</i>`;
    }

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('splash').remove();
    getOrders(orderList => {
        if (orderList) {
            Object.keys(orderList[0]).forEach(header => {
                if (!badCols.includes(header)) {
                    if (header === 'Timestamp') header = 'Submission Date';
                    else if (header === 'What is your name?') header = 'Name';
                    else if (header === 'What is your email?') header = 'Email';
                    else if (header === 'What is the course OU number? ') header = 'OU';
                    else if (header === 'Is this for a Pathway course?') header = 'Pathway';
                    var el = document.createElement('TH');
                    var text = document.createTextNode(header);
                    el.appendChild(text);
                    document.getElementById('headers').appendChild(el);
                }
            });
        } else {
            console.log('Unable to retrieve orders from Google Sheets.');
            document.getElementById('loading').innerHTML = 'Cannot retrieve orders.';
        }
        orderList.forEach(order => {
            if (!order.Complete) {
                var el = document.createElement('TR');
                document.getElementById('table').appendChild(el);
                Object.keys(order).forEach(key => {
                    if (!badCols.includes(key)) {
                        var elem = document.createElement('TD');
                        var innerText = order[key];
                        if (innerText === 'Run on my course') innerText = '\u2714';
                        var text = document.createTextNode(innerText);
                        elem.appendChild(text);
                        el.appendChild(elem);
                    }
                });
            }
        });
        document.getElementById('loading').remove();
    });
});

var usernameEl = document.getElementById('username');
var passwordEl = document.getElementById('password');
var courseOuEl = document.getElementById('courseOU');

var checkVals = setInterval(() => {
    if (usernameEl.value != '' && passwordEl.value != '') {
        document.getElementById('startButton').disabled = false;
        clearInterval(checkVals);
    }
}, 100);

var checkValsRun = setInterval(() => {
    if (usernameEl.value != '' && passwordEl.value != '' && courseOuEl.value != '') {
        document.getElementById('runCourse').disabled = false;
        clearInterval(checkVals);
    }
}, 100);
