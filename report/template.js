var template = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title></title>

    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>

    <!-- Material Icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <style>
        body {
            padding: 20px;
            font-family: "Roboto", sans-serif;
        }

        #header-container,
        #info-container,
        #report-container {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
        }

        #header-container>div,
        #info-container>div,
        #report-container>div {
            width: 50%;
            padding: 20px;
            border: solid 1px #ccc;
            box-shadow: 0 3px 5px -3px #222;
        }

        #header-container>div {
            display: flex;
        }

        #d2l-side,
        #canvas-side {
            width: 50%;
        }

        #canvas-side {
            text-align: right;
        }

        .header {
            font-size: 30pt;
            font-weight: bold;
            line-height: 1;
            margin-bottom: 10px;
        }

        .sub-header {
            font-size: 18px;
            font-weight: bold;
        }

        .block {
            border: solid 1px #ccc;
            padding: 10px;
            background-color: #efefef;
            transition: all .1s;
        }

        .block:hover {
            background-color: #eaeaea;
            cursor: pointer;
        }

        .block-content {
            border: solid 1px #ccc;
            margin-bottom: 10px;
            border-top: none;
            padding: 10px;
        }

        .title {
            font-weight: bold;
        }

        .block-content {}

        .description {
            margin-bottom: 20px;
        }

        .collapsible-header {
            transition: all .1s ease-in-out;
        }

        .collapsible-header:hover {
            background-color: #eee;
        }
    </style>
</head>

<body>

    <div id="header-container">
        <div>
            <div id="d2l-side">
                <div class="header">Brightspace</div>
                <a id="d2l-link" href="|COURSELINK|" target="_blank"></a>
                <div id="d2l-ou"><span class="title">OU:</span></div>
                <div id="date"><span class="title">Conversion Date:</span></div>
            </div>
            <div id="canvas-side">
                <div class="header">Canvas</div>
                <a id="canvas-link" href="|COURSELINK|" target="_blank"></a>
                <div id="canvas-id"><span class="title">ID:</span></div>
            </div>
        </div>
    </div>

    <div id="info-container">

        <div id="info-blocks">
            <div class="header">Changes</div>
            <div class="description">
                Here are all the changes and fixes we made to your course.
            </div>

            <ul id="report-sections" class="collapsible" data-collapsible="expandable">

            </ul>
        </div>

    </div>

</body>

</html>
`

const cheerio = require('cheerio');
var $ = cheerio.load(template);

module.exports = $;
