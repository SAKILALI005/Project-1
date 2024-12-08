const Joi = require('joi');
module.exports.listingSchema=Joi.object({
        listing : Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.object({
               url: Joi.string().required(),
               filename: Joi.string().required(),
            }),
            price: Joi.number().required().min(0),
            location: Joi.string().required(),
            country: Joi.string().required(),
        }).required()
});
module.exports.reviewSchema=Joi.object({
    Review:Joi.object({
        Rating:Joi.number().required().min(1).max(5),
        Comment:Joi.string().required()
    }).required()
});
