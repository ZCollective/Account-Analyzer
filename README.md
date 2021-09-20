# Account-Analyzer
This project aims to provide an option to quickly and simply analyze bank account statements. 

## Privacy
Privacy is our highest priority, which is why the code will never send any information along. Loading, parsing and visualizing is *entirely* done in the frontend itself! Except retrieving the js chunks no requests are done at all in fact.

## Limitations
Currently only MT940 format statements are supported as they follow a standard. Basic CSV exports are not yet supported, though we are planning to support them eventually.

## Live Usage
You can already try out the current version at: https://zcollective.de/analyzer

**If you do not want to use your own data, try the "Try a Demo!" option!**

If you notice any problems, please create an issue in the github repository!

## Usage:

There are four major informational sections in the page:
![image](https://user-images.githubusercontent.com/13379750/134076000-36713ef8-8770-40a8-9928-0d0ade050188.png)

### To the left are the general information sections:

* Top left: Time filter. You can select the months you want to make visible. At the start all months are visible. You can select multiple consecutive or random months to filter your expences.
* Middle left: Monthly balance overview. This will show (based on your filtered months) what your **average** in/out balances are. 
* Bottom left: Shows you a small graph describing your actual balance. Can be toggled btween showing € values or Months when the measurements are taken.

### Main Table
The main table shows all income and expences based on the filtered months. Here you can sort by recipients, Flow Amount.
You can also Group expenses, to see how much you pay for specific recipients, types, flows or purposes. 

Purposes are highly contextual and cannot be read from the data supplied. You can edit the purpose by clicking a line  and hitting "enter" to save.
You can save your purpose mapping for later, by clicking the "download" cloud icon on the top right. Loading the next time you are back is also available!


## Project setup

If you want to install and run it on your local machine simply follow the instructions:

```
npm install
npm run serve
```
