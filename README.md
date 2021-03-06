# MeFit

### Background

This project is the frontend for the MeFit assignment for the Express academy full stack training. The corresponding backend application can be found in [this GitHub repo](https://github.com/Epiko1994/MeFitBackend)
The deployed version of this app can be [found here](https://naughty-kowalevski-13870d.netlify.app/login)

### Purpose

This app allows the user to register and log in to see the following features:

- An overview of all available exercises with desciption and video
- An overview of workouts and programme available - put together of the available exercises
- A dashboard where the user can set goals and see the progress for set goals

### Development

Steps to work on this project

1. Clone this rep
2. Run the command npm install.
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Contributors

- [Allan Carlsen (@AllanTC)](https://github.com/AllanTC)
- [Joshua Johansen (@Epiko1994)](https://github.com/Epiko1994)
- [Liv Reinhold (@livstella)](https://github.com/livstella)
- [Michel Saremi (@MichelSaremi)](https://github.com/MichelSaremi)

### User guide 

![](user-guide.PNG?raw=true)


#### Regarding the goal dashbord:

- First you choose all the exercises you want to do each day for the next seven days. You can choose between prebuild programmes or workouts, or you can choose specific exercises. You also have the ability to choose the amount of repititions for each exercise.
- Once you have constructed a build for the next seven days, you click on the commit goal button. This will disable your ability to change the weekly build, and start a 7 day timer. 
- Under "Workouts of the day" you are able to log the exercises you have performed along with the amount of repititions. You cannot log any exercises before you have pressed the commit goal button, and you can only log exercises you have committed to.
- For the first 24 hours your logs will be substracted from the commits of the first day, the next 24 hours from the commits of the second day and so forth. There are progress bars to show your daily and weekly progress.
- At any time you can uncommit your goal and start over. 

# Project approach

### Technical tools

- GitHub - collaboration
- Netlify - Deployment and for CI/CD
- Heroku - Deployment for backend
- Swagger UI - Endpoint documentation
- Gradle - Dependency management in backend

### Project management tools

- The project is managed through Trello
- All decisions made are written on the projects Trello board
- All tasks are delegated through Trello
- GitHub
  - Main branch is a protected branch and need to pass Netlify checks and minimum 2 reviews
  - We solve our own merge conflicts before asking for reviews on out Pull Request

### MVP

Decisions regarding the MVP has been made with the intention of being customer-centric towards our hypothetical customer in mind. For this project that means:

- Endpoints for displaying data (Create and Read) are prioritised over endpoints for editing data (Update and Delete)
- Being able to visually show functionality is prioritised over perfect backend structure
- As we are not dealing with sensitive data, we decided that keycloak was not a minimum requirement, instead we provided a sufficient login and registration flow that saved the user in the database, while hashing the password using SHA-256.

### Workflow / Teamwork

- The four members of the team are divided with two members on backend and frontend respectively
- Daily stand-up at 9.00
- Weekly meeting with our mentor, Livinus, Mondays at 10.00
- Continuous communication by:
  - Marking on Trello the task you are working on
  - Moving the task to "In progress" when work starts
  - Moving the task to "Done" when definition of done has been achieved
  - If a task cannot be marked as done, due to wait time on another task, it can be labelled with "needs more info"
- There are no expectation of weekend work
- We trust each-other's ability to organise one's own work, therefore we are flexible regarding work hours
