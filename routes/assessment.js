const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Parent = require('../models/parent');
const {isLoggedIn} = require('../middleware');
const Child = require('../models/child');
const Question = require('../models/responses');

router.post('/', isLoggedIn, catchAsync(async (req, res) => {
    const parent = await Parent.findById(req.params.id);
    const child = new Child(req.body.child);
    child.parent = req.user._id;
    parent.children.push(child);
    await child.save();
    await parent.save();
    res.send("Saved");
    // res.redirect(`/parents/${parent._id}`);
}))

// router.delete('/:reviewId', isLoggedIn, catchAsync(async (req, res) => {
//     const { id, reviewId } = req.params;
//     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);
//     req.flash('success', 'Successfully deleted review')
//     res.redirect(`/campgrounds/${id}`);
// }))



// router.get('/login/assessment', async (req, res)=>{
//     res.render('assessment/assessment')
// })

router.post('/login/assessment', async (req, res)=>{
    const {name, sex, dob, bloodGroup, 
        relationship, height, weight, term, 
        diseaseMother, Head, ShortNeck, Limp, 
        whiteEye, shortnessBreath, weight2} = req.body;

    const newAns = new Question({
        "answers": [name, sex, dob, bloodGroup, 
            relationship, height, weight, term, 
            diseaseMother, Head, ShortNeck, Limp, 
            whiteEye, shortnessBreath, weight2]
    });
    newAns.answers.push();
    await newAns.save();
    res.send("Done!");
})

// router.get('/login/basicAssessment', async (req, res)=>{
//     res.render('assessment/basicAssessment')
// })

module.exports = router;