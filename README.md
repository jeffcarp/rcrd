<p align="center">
  <img alt="rcrd" src="https://cloud.githubusercontent.com/assets/916028/14357151/38739352-fcad-11e5-99fd-54e3cebdca97.png" width="287" />
</p>

<p align="center">
  <b>rcrd</b> is an exoskeleton for human memory. It aspires to be an easy way to record and recall the nouns in your life.
</p>

<p align="center">
  <a href="https://travis-ci.org/jeffcarp/rcrd"><img alt="Build Status" src="https://img.shields.io/travis/jeffcarp/rcrd/master.svg?style=flat-square" /></a>
</p>

-----

:rotating_light: Note: this repository is currently in a state of flux! If you want to learn more about the current status, please contact me.

## Development

### Running rcrd

rcrd comes with a development server and mock seed data. That is the easiest way to get started. 

```sh
npm install
API=local npm start
```

The server will start at [localhost:8000](http://localhost:8000).

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
