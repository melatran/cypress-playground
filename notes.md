# Notes on Cypress

- run `npm install cypress --save-dev` to initialize cypress within the project
- To start `npx cypress open`
- In the e2e folder, you can create folders within folders to organizer test files
- all test cases in e2e folder will be available in cypress
- fixtures can also host csv files and images
- support folder holds initial commands in cypress
- make sure you correctly open the project and that the cypress folder is within in the parent folder; otherwise you risk creating a second cypress inside the cypress folder
- https://docs.cypress.io/app/references/configuration

## Cypress
- Specs > Test files
- Run/Debug > cloud, history, etc.
- Settings
- If you want to run any of the tests, just click on a test file to intiate the test
- The window on the side is a browser, not a recording of the test (so it's actually running)
- At the top, it will display what tests have passed, skipped, or failed
- If you hover over the specs, it will highlight the step in the window
- This is still a browser so you can edit/add things and explore from that point on (you can manually use the browser window)
- Click on the flower target icon to highlight and look for locators
- If you want to run just one test only, locate the test and add `it.only` and cypress will continually monitor for changes and execute as such
- If you want to skip, do `it.skip`
- If you do `context.only`, it will only excute that section
- This is great for debugging since you can immedieatly see the execution as you run the code
- Failed test cases will generate screenshots

### Test Execution with CLI
- `npx cress run --spec "path_name"
- locate test case and copy relative path
- `npx cypress run --spec "path_name" --headed --browser <browser_name>
- https://docs.cypress.io/app/references/command-line

### Test Structure
- initalize cypress `/// <reference types="cypress" />`

## DOM
- id are unique (attribute)
- class are also attributes
- parent and children elements (nested within the parent)
- tags
- same level elements are sibblings 
- class attribute can have several values and each value is sepearted by space