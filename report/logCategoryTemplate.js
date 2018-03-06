module.exports = (logs) => {

    var headers = Object.keys(logs[0]).map(header => {
        return `<tr>${header}</tr>`;
    });

    return `
        <li>
            <div class="collapsible-header">
                ${logs[0].title}
            </div>
            <div class="collapsible-body">
                <thead>
                    ${headers.join('')}
                </thead>
                REPLACEME
            </div>
        </li>
    `;
};