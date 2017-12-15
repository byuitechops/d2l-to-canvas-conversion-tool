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
            <div class="header">Information</div>
            <div class="description">
                This list contains information about different changes made to your course.
            </div>

            <ul class="collapsible" data-collapsible="expandable">
                <li>
                    <div class="collapsible-header"><i class="material-icons">folder_open</i>Unused Files</div>
                    <div class="collapsible-body">
                        <div class="description">
                            Here is a list of unused files that are currently in your course. They are saved inside the course, but nothing else in the course links to them.
                        </div>
                        <div class="data-list">
                            <ul class="collection">
                                <li class="collection-item">potato.html</li>
                                <li class="collection-item">tomato.html</li>
                                <li class="collection-item">ben.css</li>
                                <li class="collection-item">daniel.js</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header"><i class="material-icons">forum</i>Deleted Discussion Boards</div>
                    <div class="collapsible-body">
                        <div class="description">
                            These discussion boards have been removed from the Canvas course, since they are no longer needed.
                        </div>
                        <div class="data-list">
                            <ul class="collection">
                                <li class="collection-item">Questions and Conversations</li>
                                <li class="collection-item">Questions and Conversations</li>
                                <li class="collection-item">Questions and Conversations</li>
                                <li class="collection-item">Questions and Conversations</li>
                                <li class="collection-item">Questions and Conversations</li>
                                <li class="collection-item">Questions and Conversations</li>
                                <li class="collection-item">Questions and Conversations</li>
                                <li class="collection-item">Questions and Conversations</li>
                                <li class="collection-item">Questions and Conversations</li>
                                <li class="collection-item">Questions and Conversations</li>
                                <li class="collection-item">Questions and Conversations</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header"><i class="material-icons">forum</i>Reorganized File Structure</div>
                    <div class="collapsible-body">
                        <div class="description">
                            We reorganized your file structure for you, cleaning it up as best we could. You can now find all of your course files inside of four different folders. Here's what they are and what they hold:
                        </div>
                        <div class="data-list">
                            <ul class="collection">
                                <li class="collection-item avatar">
                                    <i class="material-icons circle teal">folder_shared</i>
                                    <span class="title">documents</span>
                                    <p>All document-type files, such as word documents, excel sheets, PDFs, and CSVs.</p>
                                </li>
                                <li class="collection-item avatar">
                                    <i class="material-icons circle blue">perm_media</i>
                                    <span class="title">media</span>
                                    <p>This now contains all your images, powerpoints, videos, and similar files.</p>
                                </li>
                                <li class="collection-item avatar">
                                    <i class="material-icons circle red">folder_open</i>
                                    <span class="title">template</span>
                                    <p>Files meant for styling the course, or used in template by the course are stored here. This may not apply to campus courses.</p>
                                </li>
                                <li class="collection-item avatar">
                                    <i class="material-icons circle">folder</i>
                                    <span class="title">archive</span>
                                    <p>Anything that doesn't fit in the three folders above lands here. You may want to check this folder for any files. You might see some HTML files in there, but they should be ones not used by the course.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <div id="report-container">
        <div id="report-blocks">
            <div class="header">Report</div>
            <div class="description">
                We've added this section more for the development team's use, but it is available to you if you need it.
            </div>

            <ul class="collapsible" data-collapsible="expandable">
                <li>
                    <div class="collapsible-header red-text"><i class="material-icons">filter_drama</i>Errors</div>
                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
                <li>
                    <div class="collapsible-header yellow-text orange-text accent-4"><i class="material-icons">place</i>Warnings</div>
                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
                <li>
                    <div class="collapsible-header green-text accent-3"><i class="material-icons">whatshot</i>Successes</div>
                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
            </ul>

        </div>
    </div>
</body>

</html>
`

const cheerio = require('cheerio');
var $ = cheerio.load(template);

module.exports = $;
