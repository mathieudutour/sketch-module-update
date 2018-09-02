# DO NOT USE THIS! Use the update mechanism provided by Sketch!

---

# sketch-module-update

[![Downloads per month](https://img.shields.io/npm/dm/sketch-module-update.svg?maxAge=2592000)](https://www.npmjs.com/package/sketch-module-update/)
[![Latest version](https://img.shields.io/npm/v/sketch-module-update.svg?maxAge=3600)](https://www.npmjs.com/package/sketch-module-update/)

A sketch module to check if an plugin's update is available on Github and prompt the user to download it.

## Usage

update.js:
```javascript
import update from 'sketch-module-update'

const repoFullName = 'mathieudutour/git-sketch-plugin'

const optionalOptions = {
  timeBetweenChecks: 24 * 60 * 60 * 1000, // 1 day by default
  title: 'A new MyPluginName plugin version is available!'
}

export default update(repoFullName, optionalOptions)
```

manifest.json:
```javascript
...
"commands": [
  {
    "name": "update",
    "identifier": "update",
    "script": "update.cocoascript",
    "handlers" : {
      "actions": {
        "OpenDocument": "onRun"
      }
    }
  },
...
```

## API Documentation

Options available:

name                         | default
:----------------------------|:---------------------------------------
timeBetweenChecks            | `24 * 60 * 60 * 1000`
prefKey                      | `repoFullName + '-update-last-check'`
customizeAlert               | `function (context, alert) {}`
title                        | `'A new ' + repo + ' plugin version is available!'`
okButton                     | `Download update`
laterButton                  | `Remind me later`

## Installation
`sketch-module-update` is available from `npm`.

```shell
npm install --save sketch-module-update
```

## Compatibility
`sketch-module-update` requires [Sketch](http://sketchapp.com/) >= 3.4 (**not** with the sandboxed version ie from the App Store).
