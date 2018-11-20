# Shell Scripts
Shell scripts are a combination of single-file tools that are sometimes used along with the conversion tool and Shell modules, which are an actual part of the conversion tool. Please be aware that not all shell scripts are shell modules.

Shell scripts are saved in the shellScripts directory, and each does something unique. You'll have to look at them yourself to see what they all do. However I'll list important ones you'll need to know about below:

- `deleteOldGauntlets.js`
    - Each time the CDK is ran on a post-import child module a new course is created in Canvas. This script finds and deletes all of these courses. Run it periodically until we stop development on the conversion tool.