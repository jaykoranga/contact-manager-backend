// async handler make it easy for the async functions by not letting us write try catch
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc : get all the contacts
// @route GET /api/contacts
// @access : private

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id : req.user.id});// finding all the contacts
    res.status(200).json(contacts);//sending contacts

})
// @desc : create the contacts
// @route post /api/contacts
// @access : private
const createContact = asyncHandler(async (req, res, next) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        const error = new Error("All fields are mandatory");

        return next(error)
    }
    const contacts = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    console.log(req.body)
    res.status(200).json(contacts)
})
// @desc : update the contacts
// @route put/api/contacts/:id
// @access : public
const updateContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id)
    if (!contacts) {
        res.status(404);
        throw new ERROR("contact not found")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact)
})
// @desc : delete the contact for 
// @route delete /api/contacts/:id
// @access : public
const deleteContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id)
    if (!contacts) {
        res.status(404);
        throw new ERROR("contact not found")
    }
    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json({ message: `delete contacts for ${req.params.id}` })
})
// @desc : get the contact
// @route GET /api/contacts/:id
// @access : public
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id)
    if (!contacts) {
        res.status(404);
        throw new ERROR("contact not found")
    }
    
    res.status(200).json(contatcs)
})
module.exports = { getContacts, createContact, updateContact, deleteContact, getContact }