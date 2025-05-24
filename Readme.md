Requirements
    - .net 8.0
    - npm and nodeJs
    - yarn

Clone Repo
Setup Backend
    - open API.sln in Visual Studio or Jetbrains Rider
    - start solution if the solution doens't build run a nuget restore command
    - you can change the port in Properties/launcSettings.json if you do this update the front end .env file

Setup Frontend
    - cd into FrontEnd/ui
    - run yarn install
    - build with yarn build
    - start with yarn start
    - you can change the port in the env file by default it's 3100 but if you do this you need to update the cors setting in the back end Program.cs file

Improvements
    - use an actual database (MySQL, SQL server etc)
    - add field in backend appsettings.json for frontend port so you don't need to update code to change it
    - use https instead of http
    - finish CRUD functionality for routines and sessions
    - only allow doctor users to prescribe sessions
    
