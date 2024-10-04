const express=require('express')
const {getContacts,createContact,deleteContact,updateContact,getContact}=require("../controllers/contactController");
const validateToken = require('../middlewares/validateTokenHandler');
const router=express.Router();
router.use(validateToken)
router.get('/',getContacts)
router.route("/").post(createContact)


router.route("/:id").put(updateContact)
router.route("/:id").delete(deleteContact)

router.route("/:id").get(getContact)
module.exports=router;