# Recruitment task for the Web Front End Developer II position at Jamf Poland

#### Hello There!

I really want to get the job @ Jamf! So there you can find my solution for these awesome task. I am [Tomasz Pawlisiak](mailto:tomasz@pawlisiak.com), I hope you'll enjoy my stuff!

## Used stuff

Thank's God for open-source! I ❤️ these stuff:

- [Vue.js](https://vuejs.org/) (with [Vue CLI 3](https://cli.vuejs.org/))
- [Vuex](https://vuex.vuejs.org/)
- [SCSS](https://sass-lang.com/)
- [Axios](https://github.com/axios/axios)
- [Jest](https://jestjs.io/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

## Installation

Installation is very simple. Because othis is just a sample of my capabilities, I gave up the local configuration of the app. So you have to install all dependecies:

```shell
npm install
```

(of course you have to install [node](https://nodejs.org/en/download/), npm and [Vue CLI](https://cli.vuejs.org/guide/installation.html) on your machine first, warnings will tell you about required verion I hope)

That's all!

## Development mode

You want to work with application in development mode? Just call:

```shell
npm run serve
```

in bash. If everything goes well, the application would be visible under [http://localhost:8080](http://localhost:8080).

## Building

To build the project just call:

```shell
npm run build
```

in bash. Project will do some magic and store files in `/dist` directory.

## Testing

I will be honest. It was my first time with unit testing. The issue is high on my 'TO KNOW' list, unfortunatelly there wasn't opportunity to eplore the topic.

I used Jest framework to test validator methods. You are able to run tests with command:

```shell
npm run test:unit
```