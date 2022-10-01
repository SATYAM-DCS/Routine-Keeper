const Habit = require('../models/habits');  // require habit db
const User = require('../models/user');     // require user db
const path = require('path');               // require path


// date to string function => eg : jan 1, 2022 -> "112022"
function getTodayDate() {
    let d = new Date();
    let date = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString()
    return date
}


// home controller
module.exports.home = async (req, res) => {
    try {

        // if user logged in 
        if (req.cookies.user_id) {
            let user = await User.findById(req.cookies.user_id);            // find user
            let habits = await Habit.find({ user: req.cookies.user_id })    // find habits assosiated to user
            // render home page with logged in user and assosiated habits
            return res.render("home", {
                title: "Habit Tracker",
                habits: habits,
                user: user.email,
                date: await getTodayDate()
            });
        } else {    // if user not logged in
            // redirect to signin page
            return res.redirect('/signin');
        }

    } catch (err) {
        console.log(err)
    }
}


// create habit controller
module.exports.createHabit = async (req, res) => {
    try {

        let habit
        let user
        try {
            // find logged in user 
            user = await User.findById(req.cookies.user_id).populate();
            // if habit exesists find it 
            habit = await Habit.findOne({ content: req.body.habit, user: user.id }).populate();
        } catch (err) {
            console.log(err)
        }

        // if habit exesist
        if (habit) {
            // dont create it 
            console.log("already exesist");
        } else {
        // if habit nor exesist | create it

            // create new habit
            let habits = await Habit.create({
                content: req.body.habit,
                user: user._id,
                dates: { date: await getTodayDate(), status: "Un-marked" }
            })
            // add new habit to user-> habits array
            user.habbits.push(habits.id);
            user.save();
        }

        // redirect home
        return res.redirect('/');


    } catch (err) {
        console.log(err)
    }
}

// delete habit controller
module.exports.deleteActivity = async (req, res) => {
    try {
        // find logged in user
        let user = await User.findById(req.cookies.user_id).populate();
        if (user.id) { //if user exesist 
            // delete the activity
            await Habit.findByIdAndDelete(req.params.id);
            // pull it from user-> activity array
            user.habbits.pull(req.params.id);
            user.save();
        }

        // redirect back
        return res.redirect('back');

    } catch (err) {
        console.log(err)
    }

}

// mark as done, not done or un-marked

module.exports.markDoneNotDone = async (req, res) => {
    try {
        // get id, date, status from request.query
        let id = req.query.id;
        let date = req.query.date;
        let status = req.query.status
        // find habit
        let habit = await Habit.findById(id).populate();

        // if status == new-status
        if (status == "new-status") {
            // add new date and status as done
            habit.dates.push({
                date: date,
                status: "done"
            })
            habit.save();

        } else {
            // iterate over dates in habit 
            for (let i = 0; i < habit.dates.length; ++i) {
                // find thr current date
                if (habit.dates[i].date == date) {
                    // if status if done | mark it as not-done
                    if (habit.dates[i].status == "done") {
                        habit.dates[i].status = "Not-Done"
                    // if status if not-done | mark it as Un-marked
                    } else if (habit.dates[i].status == "Not-Done") {
                        habit.dates[i].status = "Un-marked"

                    // if status if un-marked | mark it as done
                    } else {
                        habit.dates[i].status = "done"
                    }
                    break;
                }
            }
            habit.save();
        }
        // redirect back
        return res.redirect('back');

    } catch (err) {
        console.log(err)
    }
}

// weekly report
module.exports.weeklyreport = async (req, res) => {
    try {

        // if user logged in
        if (req.cookies.user_id) {
            // find habits assosiated to user
            let habits = await Habit.find({ user: req.cookies.user_id })
            let user = await User.findById(req.cookies.user_id);
            // render weekly-report ans pass the habits and user
            return res.render('weekly-report', {
                title: "Habit Tracker | Weekly Report",
                habits: habits,
                user: user.email
            })
        } else {
            return res.redirect('/login')
        }

    } catch (err) {
        console.log(err)
    }
}