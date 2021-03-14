# Account-Analyzer
This project aims to provide an option to quickly and simply analyze bank account statements. 

## Privacy
Privacy is our highest priority, which is why the code will never send any information along. Loading, parsing and visualizing is *entirely* done in the frontend itself! Except retrieving the js chunks no requests are done at all in fact.

## Limitations
Currently only MT940 format statements are supported as they follow a standard. Basic CSV exports are not yet supported, though we are planning to support them eventually.

## Live Usage
You can already try out the current version at: https://zcollective.de/analyzer

If you notice any problems, please create an issue in the github repository!

## Project setup

If you want to install and run it on your local machine simply follow the instructions:

```
npm install
npm run serve
```