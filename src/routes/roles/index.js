const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../../middleware/verifyToken");
const Role = require("../../models/roles");

const router = require("express").Router();

// Update Language

router.patch("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        const role = updatedRole._doc;

        res.status(200).json(role);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete Role

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Role.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Role deleted Successfully"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get Role By Id

router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const getRole = await Role.findById(req.params.id);

        const role = getRole._doc;

        res.status(200).json(role);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All Role

router.get("/", verifyTokenAndAuthorization, async (req, res) => {
    const query = req.params.new;
    try {
        const roles = query
            ? await Role.find().sort({ _id: -1 }).limit(1)
            : await Role.find();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create Roles 

router.post('/', verifyTokenAndAuthorization, async (req, res) => {
    try {

        let role = await Role.findOne({
            name: req.body.name.toUpperCase()
        })

        if (role) {
            res.status(409).json({
                "error": "Role Already exist."
            })
            return false
        }
        const newRole = new Role({
            name: req.body.name.toLowerCase(),
            permissions: req.body.permissions,
        })
        const createdRole = await newRole.save()
        res.status(201).json(createdRole)

    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;