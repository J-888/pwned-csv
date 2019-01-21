# pwned-csv

## Usage

 ```bash
 node index.js --csv ./Chrome Passwords.csv
```

## Setup

### Node.js installation

* Install [Node.js](https://nodejs.org/) if you don't have it already.
  *Note: Node 6 or greater would be better for "best results".*

### Setup with npm

* Install the dependencies and link them:

 ```bash
npm install
npm link
```

## Detailed usage
 
### Obtaining Chrome Password.csv

Open Google Chrome password settings (`chrome://settings/passwords`), press the more options (`⋮` icon), and click on `Export passwords...`. This should down download a `Chrome Password.csv` file. Put it on the root folder of pwned-csv and run the following from a command prompt where you have Node.js
 ```bash
 node index.js --csv ./Chrome Passwords.csv
```
Tip: if you have kept the default name, you can skip the `--csv` option:
 ```bash
 node index.js
```
### CLI Options

<!---
| Options  |                  | Description                     | Default value         |
|:--------:|:---------------- | ------------------------------- | --------------------- |
|          | --csv <csv file> | Read passwords from a .csv file | ./Chrome Password.csv |
| -s       | --safe           | Display safe passwords          | false                 |
| -h       | --help           | Output usage information        |                       |
| -V       | --version        | Output the version number       |                       |
--->

<table>
<th colspan=2>Options<th>Description<th>Default value
<tr>
<td colspan=2>--csv <csv file><td>Display safe passwords<td>./Chrome Password.csv
<tr>
<td>-s<td>--safe<td>Display safe passwords<td>false
<tr>
<td>-h<td>--help<td>Output usage information<td>
<tr>
<td>-V<td>--version<td>Output the version number<td>
</table>
