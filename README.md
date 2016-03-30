# rcrd

[![Build Status](https://travis-ci.org/jeffcarp/rcrd.svg?branch=master)](https://travis-ci.org/jeffcarp/rcrd)

This repository is currently in a state of flux! If you want to learn more about the current status, please contact me.

rcrd is a tool I built to track habits, like exercise or drinking.

## Development

### Running rcrd

rcrd comes with a development server and mock seed data. That is the easiest way to get started. 

:rotating_light: however! the mock seed data only works for @jeffcarp so work is needed to abstract it further.

```sh
npm install
MOCK=true npm start
```

### Directory structure

```
- browser     JS modules that run on app.rcrd.org
- docs        future home of more documenatation
- ios         simple iOS wrapper app for app.rcrd.org
- lambda      AWS Lambda function & modules
- scripts     utility scripts (deploy, data migrations)
- server      development server
- static      HTML, CSS, and built JS for app.rcrd.org
- test        all tests
- www         static site that lives at www.rcrd.org
```
