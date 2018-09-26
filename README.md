# CAT PWA

A demo PWA using React and Nodejs.


## Getting started

### Configure the server

In order to fetch the images, the server requires a Flickr API key. Request one [from this link](https://www.flickr.com/services/apps/create/noncommercial/?) and create a `dev.json` file in the `server/config` folder with two fields, `api_key` and `app_secret`. This file is ignored by git to prevent leaking credentials.

### Install server deps

Just go to the `server` folder and run

```
npm install
```


### Install client deps

From the `client` folder run

```
npm install
```


### Creating and serving the app bundle

From the `client` folder run

```
npm run build
```

### Launch the server

From the `server` folder run

```
npm start
```

This command will server the app in [http://localhost:3333/](http://localhost:3333/)