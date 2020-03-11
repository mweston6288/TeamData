## Purpose

Design a portfolio page for your programming team

## How to Use

Open terminal and change directory to where app.js is located.
Run 'npm install'
Run 'node app.js' to begin.

A menu will appear with options:
* Add Manager
* Add Engineer
* Add Intern
* Create Portfolio
* Exit

Select your option and follow the prompts

## Add Manager/Engineer/Intern

If you select any of these options, you will be prompted to answer a few questions.

Questions common to all three:
* Name
* Employee ID
* Email

Question unique to Manager:
* Office Number

Question unique to Engineer:
* Github account

Question unique to Intern:
* School

Note: You cannot leave these areas blank.

## Create Portfolio

Creates an HTML document that is saved in output/team.html
If there is already a file with that name, it will be overriden

## Exit

Close the application. You will lose any unsaved data.

## Additional folders and files

* ./lib:
	Contains the source code to run the application
* ./templates
	A sample html file used to template the final product
* ./test
	Test files
	
## Future development options
* Create an option to edit/delete previous entries
* Save portfolio on exit
* Save and load previous team data
