const Express = require("express");
const router = Express.Router();
const fetchUSER = require('../Middleware/FtechUsers');
const notesData = require("../models/NotesSchema");
const { body, validationResult } = require('express-validator');

// route 1: ./notes/fetchNotes ---FETCH THE NOTES OF A PARTICULAR ID  ::: login required

router.get('/fetchNotes', fetchUSER, async (req, res) => {
    try {

        const notes = await notesData.find({ user: req.user.id })
        res.send(notes);
    } catch (err) {
        // console.log(err);
        res.status(404).json({ "err occouured": err });


    }

})



// route 2: ./notes/addNotes ---ADD NOTES to A PARTICULAR ID ::: login required

router.post('/addNotes', fetchUSER,
    [
        //  these are validation check..
        body('title', ' there is the need of atleast 3 letter ').isLength({ min: 5 }),
        body('discription', 'enter something').exists(),
    ],
    async (req, res) => {
        try {
            const { title, tags, discription } = req.body

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const notes = new notesData({
                title, tags, discription, user: req.user.id
            })

            const saveNotes = await notes.save();
            res.send(saveNotes)

        } catch (err) {
            console.log(err.message);
            res.status(404).json({ "Error occouured !! ": err.message });


        }

    })



// route 3: ./notes/UpdateNotes ---Update NOTES to A PARTICULAR ID ::: login required


// put is generally  used for updation notes
router.put('/UpdateNotes/:id', fetchUSER,


    async (req, res) => {
        try {
            // since after destructuring the notes the 
            console.log(req.body);
            const { title, discription, tags } = req.body

            const UpdatedNote = {}
            if (title) { UpdatedNote.title = title };
            if (discription) { UpdatedNote.discription = discription };
            if (tags) { UpdatedNote.tags = tags };

            // console.log(UpdatedNote)

            // making the application secure .....
            let previous_note = await notesData.findById(req.params.id)


            if (!previous_note) {
                return res.status(404).send("Notes not Found")
            }

            // if the id is invalid which can be changed via tampering the endpoint then return not found
            console.log(`notes to be updated  -- ${previous_note.id.toString()}`);
            console.log(`id value is -- ${req.params.id}`);


            if ((previous_note.id.toString()) !== (req.params.id)) {
                return res.status(401).send("NOT allowed")
            }

            await notesData.findByIdAndUpdate(req.params.id, { $set: UpdatedNote }, { new: true })


            res.json([{ previous_note }, { UpdatedNote }])


        } catch (err) {
            console.log(err.message);

            res.status(404).json({ "Internal Error occouured !! ": err.message });


        }

    })




// route 4: ./notes/DeleteNote ---DELETE NOTES to A PARTICULAR ID ::: login required


// Delete is generally  used for delete notes
router.delete('/deleteNotes/:id', fetchUSER,


    async (req, res) => {
        try {
            // making the application secure .....
            let previous_note = await notesData.findById(req.params.id)


            if (!previous_note) {
                return res.status(404).send("Notes not Found")
            }

            // if the id is invalid which can be changed via tampering the endpoint then return not found
            console.log(`notes to be updated  -- ${previous_note.id.toString()}`);
            console.log(`id value is -- ${req.params.id}`);


            if ((previous_note.id.toString()) !== (req.params.id)) {
                return res.status(401).send("NOT allowed")
            }

            previous_note = await notesData.findByIdAndDelete(req.params.id)
            res.json({
                "sucess": "the note has been delted",
                "Note": previous_note
            })


        } catch (err) {
            console.log(err.message);

            res.status(404).json({ "Internal Error occouured !! ": err.message });


        }

    })
module.exports = router