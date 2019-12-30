const moment = require('moment');
      Joi = require('@hapi/joi')


const schema = Joi.object({
  checkIn: Joi.string().trim().length(10).required(),
  checkOut: Joi.string().trim().length(10).required()
})


function toDate(dateStr) {
  var parts = dateStr.split("/")
  console.log(new Date(parts[2], parts[1] - 1, parts[0]));
  return new Date(parts[2], parts[1] - 1, parts[0])
}



function validateDate(params){

    if(!params.checkIn || !params.checkOut) return false

    if(schema.validate(params).error) return false

    checkIn = toDate(params.checkIn)
    checkOut = toDate(params.checkOut)

    if(moment(checkIn) >= moment(checkOut)) return false

    return true

}

module.exports = validateDate;
