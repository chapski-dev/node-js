import { Response } from "express";
import { Result, ValidationError } from "express-validator";


export const handleErrors = (res: Response, errors: Result<ValidationError>) => {
  console.log("--Error--");
  console.log('errors.array()', errors.array());
  
  return res.status(400).send({
    success: false,
    errors: errors.array(),
  });
}