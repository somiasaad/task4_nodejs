const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/users", (req, res) => {
  console.log(req.body);

  const user = new User(req.body);

  user
    .save()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

////////////////////////////////////////////////////////////////////////////////////

// Get All Elemnts

router.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

/////////////////////////////////////////////////////////////////////////////////

// Get elment by id

router.get("/users/:id", (req, res) => {
  //   console.log(req.params)
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send("UNABLE TO FIND USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
      }
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

/////////////////////////////////////////////////////////////////////////////////

// Put to update data by id

router.put("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("No User Founded");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//////////////////////////////////////////////////////////////////////////////////

// Delete data by id
router.delete("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send("UNABLE TO FIND USER");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
