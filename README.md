# DynamoDictionary

Dynamo Dictionary development repo

Live version here: http://dictionary.dynamobim.com

## Installation
- Version 8 of Node is required. Later versions of Node are known to cause installation problems.
- In root directory, type ```npm install``` into the command line.
- If you find that the command hangs, feel free to use `yarn` instead of `npm`.

## Run in Development Mode
- In root directory, type ```npm run start``` into the command line.

## Deploy to Autodesk

- Confirm that `homepage` in `package.json` is set to `http://dictionary.dynamobim.com/`. The developer may change this address depending on the staging environment.

- In root directory: ```npm run build```

- Copy files from `build` folder and place into the root directory of the [Autodesk Dynamo Dictionary repo](https://github.com/DynamoDS/DynamoDictionary), in the appropriate `branch`.
