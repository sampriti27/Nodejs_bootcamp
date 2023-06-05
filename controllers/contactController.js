const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//Desc get all contacts
//@rout GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  //   res.send("Get all Contacts"); sending normal respons
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contacts }); // send json response
});

//Desc get  contact
//@rout GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  // find if the contact is present or not
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }
  res.status(200).json(contact); // send json response
});

//Desc create new contacts
//@rout POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log("The req body is:", req.body);
  //destructure the values from the body
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);

    throw new Error("All fields are mandatory!");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact); // send json response
});

//Desc update contacts
//@rout PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  // find if the contact is present or not
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User not permitted to perform this action.");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact); // send json response
});

//Desc delete contacts
//@rout DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  // find if the contact is present or not
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User not permitted to perform this action.");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact); // send json response
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
