# MeFit

## Background

This project is the frontend for the MeFit assignemt for the experiss academy full stack training. The corresponding backend application can be found in [this GitHub repo](https://github.com/Epiko1994/MeFitBackend)
The deployed version of this app can be [found here](https://naughty-kowalevski-13870d.netlify.app/login)

## Purpose

This app allows the user to register and log in to see the following features:

- An overview of all available exercises with desciption and video
- An overview of workouts and programme available - put together of the available exercises
- A dashboard where the user can set goals and see the progress for set goals

## Development

Steps to work on this project

1. Clone this rep
2. Run the command npm install.
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Contributors

- [Allan Carlsen (@AllanTC)](https://github.com/AllanTC)
- [Joshua Johansen (@Epiko1994)](https://github.com/Epiko1994)
- [Liv Reinhold (@livstella)](https://github.com/livstella)
- [Michel Saremi (@MichelSaremi)](https://github.com/MichelSaremi)

## User guide 

![](user-guide.PNG?raw=true)

# Project approach

### Technical tools

- Netlify - for CI/CD
- GitHub for collaboration
- Swagger UI - for endpoint documentation
- Gradle - for dependency management in backend

### Project management tools

- The project is managed through Trello
- All decisions made are written on the projects Trello board
- All tasks are delegated trhough Trello
- GitHub
  - Main branch are a protected branch and need to pass Netlify checks and minimun 2 reviews
  - We solve our own merge conflicts before asking for reviews on out Pull Request

### MVP

Desicions regarding the MVP has been made with a the intention of being customer centric, with the hypothetical customer in mind. For this project that means:

- Endpoints for displaying data (Create and Read) are priotitised over endpoints for editing data (Update and Delete)
- Being able to visually show functionality is prioritised over perfect backend structure

### Workflow / Teamwork

- The four memebers of the team are diveded with two memebers on backend and frontend respectively
- Daily stand-up at 9.00
- Weekly meeting with our mentor, Livinus, Mondays at 10.00
- Continuious communication by:
  - Marking on Trello the task you are working on
  - Moving the task to "In progress" when work starts
  - Moving the task to "Done" when definition of done has been achieved
  - If a task cannot be marked as done, due to wait time on another task, it can be labelled with "needs more info"
- There are no expectation of weekend work
- We trust eachother's ability to oganise one's own work, therefore we are flexible regarding work hours
