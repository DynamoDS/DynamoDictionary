# DynamoDictionary

Live version here: http://dictionary.dynamobim.com

## Installation

- Node.js version 12 is required. [Download the installer here](https://nodejs.org) (or use [nvm](https://github.com/nvm-sh/nvm).)
- Run `npm install` from the command line in the project root directory.
- Note that the `project-lock.json` file has URLs that point to an Autodesk internal NPM mirror.  If you do not have access to that mirror, you will need to delete the `package-lock.json` before `npm install` will succeed.

## Run the Development Server
- Run `npm start` from the command line in the project root directory.
- A browser window with the development site at http://localhost:3000 should open automatically. It may take a few seconds for the site to appear the first time.

## Build the Static Deployment 

- Run `npm run build` from the command line in the project root directory.
- To test serving the static files locally, run `npx serve -s build`. 
- Open the local static site at http://localhost:5000.

## Deploying

- Refer to internal documentation.
