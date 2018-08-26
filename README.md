
Full stack application based on Thinkjs+React+Antd+Mysql+geetest

## Features
* User management
* Anthorization
* Register
* I18N
* Theming
* Dynamic captcha

## Structure
* Library/web/i18n //Config i18n
* Library/config-overrides //Config theme

## Install dependencies

```
Run npm install under Library and npm install under Library/web separately.
```

## Start server

* Run "npm start" under Library to start server
* Run "npm start" under Library/web to start react app


## Deploy with pm2
* Run "npm run build" to deploy react app into thinkjs
* Then follow thinkjs deployment guid

## Todo
* Refine message
* Runtime theme
* Home page
* ...