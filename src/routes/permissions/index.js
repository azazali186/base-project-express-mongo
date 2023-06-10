const {
    verifyTokenAndAuthorization
} = require("../../middleware/verifyToken");
const Permission = require("../../models/permissions");

const router = require("express").Router();


// Get All Permissions

router.get("/", verifyTokenAndAuthorization, async (req, res) => {
    const query = req.params.new;
    try {
        const permissions = query
            ? await Permission.find().sort({ _id: -1 }).limit(1)
            : await Permission.find();
        res.status(200).json(permissions);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;