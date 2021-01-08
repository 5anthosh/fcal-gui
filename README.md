# Fcal⚙️

Open source cross platform simple calculator

> Built using [fcal](https://github.com/5anthosh/fcal) npm library
> Using fcal, you can perform basic arithmetic, percentage operations with precision.
> It features a flexible expression parser with a large set of built-in units, functions and constants.
> Inspired from [Numi](https://numi.app)

![Fcal gui](https://raw.githubusercontent.com/5anthosh/fcal/assets/fcal-gui.png)

## Features

- Currency conversion
- Units conversion
- Variables
- Functions

## Run

#### Electron

```sh
$ npm install
$ npm run build && npm run start
```

#### Webkit and Golang

```sh
$ npm install
$ npm run build
$ npm run gobuild
$ ./dist/fcal
```

## Build

#### Electron

```sh
$ npm install
$ npm run build
$ npm run dist
```

#### Webkit and Golang

```sh
$ npm install
$ npm run gobuild
$ ./bin/build-linux.sh #Linux debian
$ ./bin/build-windows.bat # Windows
$ ./bin/build-macos.sh # Macos
```

## Download

1. Linux
   - [Debian](https://github.com/5anthosh/fcal-gui/releases/download/v0.0.1/fcal_0.0.1_amd64.deb)
   - [Arch](https://github.com/5anthosh/fcal-gui/releases/download/v0.0.1/fcal-0.0.1.pacman)
   - [tar.gz](https://github.com/5anthosh/fcal-gui/releases/download/v0.0.1/fcal-0.0.1.tar.gz)
2. [Windows](https://github.com/5anthosh/fcal-gui/releases/download/v0.0.1/Fcal.Setup.0.0.1.exe)

3. [Web](https://fca1.netlify.app)
