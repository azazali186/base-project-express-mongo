const {
    verifyTokenAndAuthorization
} = require("../../middleware/verifyToken");
const Language = require("../../models/language");

const router = require("express").Router();

// Update Language

router.patch("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedLanguage = await Language.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        const language = updatedLanguage._doc;

        res.status(200).json(language);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete Language

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Language.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Language deleted Successfully"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get Language

router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const getLanguage = await Language.findById(req.params.id);

        const language = getLanguage._doc;

        res.status(200).json(language);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All Languages

router.get("/", verifyTokenAndAuthorization, async (req, res) => {
    const query = req.params.new;
    try {
        const languages = query
            ? await Language.find().sort({ _id: -1 }).limit(1)
            : await Language.find();
        res.status(200).json(languages);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create Languages 

router.post('/', verifyTokenAndAuthorization, async (req, res) => {
    try {

        let language = await Language.findOne({
            code: req.body.code.toUpperCase()
        })

        if (language) {
            res.status(409).json({
                "error": "Language Code Already exist."
            })
            return false
        }
        const newLanguage = new Language({
            name: req.body.name.toLowerCase(),
            code: req.body.code.toUpperCase(),
        })
        const createdLanguage = await newLanguage.save()
        res.status(201).json(createdLanguage)

    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;