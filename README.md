# Rate My Landlord

###### Project by Patrick Choo and Tina Lu

## What is Rate My Landlord?

Rate My Landlord is a website inspired by the popular "Rate My Professor" website that many college students use to see which professors are good or bad. Our goal was to recreate this popular website, but for rating bad or good landlords. 

This project includes frontend languages and frameworks, such as React, HTML, and CSS and also includes popular backend frameworks and libraries, such as Node, axios, and nodemon. For our database we used AWS DynamoDB to store landlord data.

In order to run this you must have an AWS DyanmoDB table adhering to the fields in our code. 

## To Run:

First, clone the repository. Enter your AWS keys into dynamo.js file, or alternatively put them in a .env file. Next run:
```
node server
```
to start the server. 
Next, in the original directory, run:
```
npm start
```

Finally, start searching and rating landlords at your leisure!
