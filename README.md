# pwned-csv 

> Fastest way to make sure all your passwords are safe

[![Build Status](https://travis-ci.org/J-888/pwned-csv.svg?branch=master)](https://travis-ci.org/J-888/pwned-csv)

<img src="https://i.imgur.com/PV8ZIJr.png" width="394">

## Basic usage

```bash
$ node pwned.js --csv ./Chrome Passwords.csv
```

## Table of contents

- [Setup](#setup)
  * [Node.js installation](#nodejs-installation)
  * [Setup with npm](#setup-with-npm)
- [Detailed usage](#detailed-usage)
  * [Obtaining Chrome Passwords.csv](#obtaining-chrome-passwordscsv)
  * [CLI Options](#cli-options)

---

## Setup

### Node.js installation

* Install [Node.js](https://nodejs.org/) if you don't have it already.
  *Note: Node 6 or greater would be better for "best results".*

### Setup with npm

* Install the dependencies and link them:

 ```bash
$ npm install
$ npm link
```

## Detailed usage
 
### Obtaining Chrome Passwords.csv

Open Google Chrome password settings (`chrome://settings/passwords`), press more options (`⋮` icon), and click on `Export passwords...` This should down download a `Chrome Passwords.csv` file. Put it on the root folder of pwned-csv and run the following from a command prompt where you have Node.js
 ```bash
$ node pwned.js --csv ./Chrome Passwords.csv
```
Tip: if you have kept the default name, you can skip the `--csv` option:
 ```bash
$ node pwned.js
```
### CLI Options

<!---
| Options  |                  | Description                     | Default value          |
|:--------:|:---------------- | ------------------------------- | ---------------------- |
|          | --csv <csv file> | Read passwords from a .csv file | ./Chrome Passwords.csv |
| -s       | --safe           | Display safe passwords          | false                  |
| -h       | --help           | Output usage information        |                        |
| -V       | --version        | Output the version number       |                        |
--->

<table>
<th colspan=2>Options<th>Description<th>Default value
<tr>
<td colspan=2>--csv <csv file><td>Display safe passwords<td>./Chrome Passwords.csv
<tr>
<td>-s<td>--safe<td>Display safe passwords<td>false
<tr>
<td>-h<td>--help<td>Output usage information<td>
<tr>
<td>-V<td>--version<td>Output the version number<td>
</table>
