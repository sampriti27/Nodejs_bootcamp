const asyncHandler = require("express-async-handler");
//Desc get all contacts
//@rout GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  //   res.send("Get all Contacts"); sending normal respons
  res.status(200).json({ message: "Get all contacts" }); // send json response
});
//Desc get all contacts
//@rout GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contacts for ${req.params.id}` }); // send json response
});

//Desc create new contacts
//@rout POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  console.log("The req body is:", req.body);
  //destructure the values from the body
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);

    throw new Error("All fields are mandatory!");
  }
  res.status(201).json({ message: "Create contact" }); // send json response
});

//Desc update contacts
//@rout PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contacts for ${req.params.id}` }); // send json response
});

//Desc delete contacts
//@rout DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contacts for ${req.params.id}` }); // send json response
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
