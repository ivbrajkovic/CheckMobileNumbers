# Job tasks

##### Description of the solution

The repository contains my full-stack solution to the task.  
The repository contains a server that serves a static page, and an API service that has two routes.

##### Frameworks used

Express, Preact and MaterialUI framework.

## API service

##### GET route

Checks ONE phone number  
The format of the correct number is "27 83 XXXXXXX", respectively:

- 27 - is a country code
- 83 - is the area code of the operator
- XXXXXXX - is a phone number

If the number is correct it returns a success message.  
If the number is incorrect, it tries to correct the number by adding the county code and the operator code.

##### POST route

Checks multiple numbers in a CSV file.  
The file is uploaded to the server to check the numbers, and the service returns the corrected numbers.  
The server saves the original file and the corrected file in the "/ uploads" directory.

## Frontend

A Preact website containing two text boxes.

##### First text box

Checks the manually typed number by clicking on the icon or pressing the "enter" key.  
After which it invokes the API for checking one number and prints a status notification.  
If the number is corrected, the actions taken on the number itself are displayed, or if the number is incorrect, an error message is displayed.

##### Second text box

Text box other than the send icon also contains a file selection icon.  
Once a file is selected, clicking on the file upload icons teh file is sent to the server by calling the file verification API.  
After checking the file, a table with correct and incorrect numbers is displayed, and what actions have been taken.
