# Check Mobile Number

### Demo

Demo aviable at [Check Mobile Number](https://check-mobile-number.herokuapp.com/).

Demo is hosted on free [Heroku](https://www.heroku.com/home) account, so after 30 minutes of inactivity, go to standby, so it will take a few minutes when you first open the page.

### Frameworks used

[ExpressJS](https://expressjs.com/), [PreactJS](https://preactjs.com/) and [MaterialUI](https://material-ui.com/) framework.

- ExpresJS - serve static files and validation service API
- PreactJS - fast 3kB alternative to React
- MaterialUI - css framework

### Description of the solution

The repository contains my full-stack solution to the task.  
The repository contains a server that serves a static page, and an API service that has two routes.

---

## API Services

<!-- ### GET route (/api/validate/:number) -->

### 1. Validate Number (/api/validate/:number)

It is a GET route that validate one phone number.

The format of the correct number is "27 83 XXXXXXX", respectively:

- 27 - is a country code
- 83 - is the area code of the operator
- XXXXXXX - is a phone number

If the number is correct it returns a success message.  
If the number is incorrect, it tries to correct the number by adding the county code and the operator code.

### 2. Validate File (/api/validate/file)

It is a POST route that validate a CSV file.

The file is uploaded to the server to check the numbers, and the service returns the corrected numbers.  
The server saves the original file and the corrected file in the "/ uploads" directory.

---

## UI Frontend

A Preact website containing two text boxes.

### 1. First text box

Checks the manually typed number by clicking on the icon or pressing the "enter" key.  
After which it invokes the API for checking one number and prints a status notification.  
If the number is corrected, the actions taken on the number itself are displayed, or if the number is incorrect, an error message is displayed.

### 2. Second text box

Text box other than the send icon also contains a file selection icon.  
Once a file is selected, clicking on the file upload icons teh file is sent to the server by calling the file verification API.  
After checking the file, a table with correct and incorrect numbers is displayed, and what actions have been taken.
