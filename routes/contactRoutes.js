const express = require("express");

const router = express.Router();

const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
// route for getting all contacts amd creating new contact

router.route("/").get(getContacts).post(createContact);

// route for getting a single contact

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact); //since they have same route so they can be defined in  a single line.

// // route for updating a contact

// router.route("/:id").put(updateContact);

// // route for deleting a contact
// router.route("/:id").delete(deleteContact);

module.exports = router;
