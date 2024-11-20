const express = require('express');
const { sendEmail } = require('./../controllers/newsletterController');

const newsletterRouter = express.Router();

newsletterRouter.post('/', sendEmail);

module.exports = newsletterRouter;
