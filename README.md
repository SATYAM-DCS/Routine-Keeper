
# Habit-Tracker
A habit tracker app, where we can define habits and track them.

## dependencies:
connect-mongo, mongoose, cookie-parser, dotenv, ejs, express, express-ejs-layouts, express-session, nodemon



## Features
- Add multiple habits to track like reading a book, going to the gym etc
- Track each habit everyday. These are the 3 statuses of a habit:
    - Done - Mark the habit as done for a day
    - Not done - Mark the habit as not done for a day
    - Un-marked - User did not take any action on a habit for a day
- A view to show all current habits.
- A view to display 7 days of each habit
    - User can mark todays habit
    - Previous 6 days and the status of that habit for each day
    - A user can toggle between the three (above mentioned) statuses of a habit i.e. I can change today’s status as done, not done or none anytime.
    - Also user can change any of the previous days status i.e. I can change the status of a habit for yesterday, day before yesterday or any previous 6 days as well

# Directory Structure

```
Habit Tracker
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env
├── assets
│   ├── css
│   │   └── home.css
│   └── images
│       └── logo.png
├── config
│   └── mongoose.js
├── controllers
│   ├── home-controller.js
│   └── user-controller.js
├── models
│   ├── habits.js
│   └── user.js
├── routes
│   └── index.js
|── views
|    ├── _navigation.ejs
|    ├── home.ejs
|    ├── layout.ejs
|    ├── signin.ejs
|    └── weekly-report.ejs
|
```

## Tech Stack:
- Node JS
- Express JS
- Mongo DB
- HTML, CSS, Bootstrap
- Heroku


## Deployed on Railway-APP

https://habits-tracker.up.railway.app/signin







## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Related

Here are some related projects

[Awesome README](https://github.com/matiassingers/awesome-readme)


## Feedback

If you have any feedback, please reach out to us at dubeysatyam525@gmail.com

