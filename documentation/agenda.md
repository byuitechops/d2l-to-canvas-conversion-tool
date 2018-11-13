# Agenda #

## Purpose ##
`Agenda.js` controls the flow of the conversion tool. It determines the runtime and run order of each shell module, child module, and grandchild. It is aware of the current platform and will change the tool workflow accordingly. It also handles lists required modules for each child module (ie: blueprint-lock-items requires enable-blueprint to run). New child modules will not run until they are correctly added to the agenda.


Modules run in the order they are listed in the agenda (top down). 
The action-series section of the agenda determines what order the grandchildren will run in ONLY in relation to each other, NOT in relation to other post-import children. There is a child module in the post-import section named action-series-master that determines when the grandchildren run in relation to child modules.

## Structure ##
The file is split into the five different sections of the conversion tool (preparation, pre-import, import, post-import, and cleanup) and action series. Each section is an array of objects detailing necessary information on each child module. The exact format of these objects is shown below:

``` js
{
    name: 'blueprint-lock-items', // Name of the child module. MUST match the package.json of that child module
    type: 'postImport',           // What type of module is it
    platform: {                   // Specifies disabled, optional, default, or required by platform
        online: 'default',
        pathway: 'default',
        campus: 'disabled'
    },
    description: 'Locks most items in the course, if course is a blueprint.',
    requiredModules: ['course-make-blueprint'],  // Lists modules that must run prior to this one
    options: []                   // List module options to be determined during the initial prompt
}
```

The `platform` object uses four keywords to determine how the module should behave in each platform.
- Disabled - Will not run. Not included in the prompt.
- Optional - Turned off by default. Can be enabled in the prompt
- Default - Enabled by default. Can be disabled in the prompt
- Required - Will run. Not included in the prompt


The `options` array is used to determine how the child module should run. Each object in the options array adds a question to the initial prompt. Options are platform specific.
The create-homepage child module is a good example. It uses options to ask the user what type of homepage should be created for a campus course. The following is an example of an options object:

```js
{
    type: 'radio',              // What type of question to ask. (defaults to on/off)
    platform: 'campus',         // what platform to ask this question for (default is all)
    name: 'campusTemplate',     // name of the option
    default: 'Basic',           // default value for 'radio' type
    choices: [                  // list of options the user has to select from
        'Basic',
        'Basic Details',
        'Lg Ends Details',
        'Lg Ends Plain',
        'Modules',
        'Other',
        'Full Pictures',
        'Schedule',
        'Small Pictures',
        'Sm Weeks Auto',
        'Syllabus',
        'Weeks Auto'
    ]
}
```

build-file-structure also provides a good example:

```js
{
    name: 'Create three main folders',  // name of the option
    online: true,                       // default value for online
    pathway: true,                      // default value for pathway
    campus: false                       // default value for campus
    }
```




