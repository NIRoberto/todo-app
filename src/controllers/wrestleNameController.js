
import { wrestlenames } from '../database/models';
import Joi from '@hapi/joi';
const schema = {
    name: Joi.string().max(30).min(3).required(),
};

export const getWrestles = async (req, res) => {
    try {
        const allWrestles = await wrestlenames.findAll({});
            return res.status(200).json({
                message: "success",
                allWrestles
            });
        
         
        }
        catch (error) {
            return res.status(500).json({
                error: error.message
            })
        
        }
    
}
    
   export const getOneWrestle = async (req, res) => {
     
        try {
            const getWrestle = await wrestlenames.findByPk(req.params.id);

            if (!getWrestle) {
                   return res.status(404).json({
                Error: "Not found",
            });
            }
               else if (req.loggedUser.email !== getWrestle.wrestleCreatorEmail) {
                    return res.status(403).json({
                     Error: "You can't get  wrestle name which is not yours",
                   });
        
            }
            else {
                return res.status(200).json({
                message: "success",
                getWrestle
            });
            }
        
         
        }
        catch (error) {
            return res.status(400).json({
                error: error.message
            })
        
        }
    
    }
  export const postWrestles = async (req, res) => {
    const { error } = Joi.validate(req.body, schema);
         if (error) {
          return  res.status(400).json({
            message: error.details[0].message
            })
    }
    const wrestle = await wrestlenames.create({
        name: req.body.name,
        wrestleCreatorEmail:req.loggedUser.email
       })
     
        try {
         
            return res.status(201).json({
                message: "wrestle name created successfully",
                wrestle: wrestle,
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message
            })
        
        }
    
    }
export const updateWrestles = async (req, res) => {

    try {
     
              const getWrestle = await wrestlenames.findByPk(req.params.id);
           if (!getWrestle) {
                   return res.status(404).json({
                Error: "Not found",
                   });
               
           }
           else if (req.loggedUser.email !== getWrestle.wrestleCreatorEmail) {
                    return res.status(403).json({
                     Error: "You can't update wrestle name which is not yours",
                   });
        
        }
        
           else {
               console.log(getWrestle.wrestleCreatorEmail);
               

        const { error } = Joi.validate(req.body, schema);
         if (error) {
          return  res.status(400).json({
            message: error.details[0].message
            })
        }
               const updateName = await getWrestle.update({
                   name:req.body.name
                   
               })
                  return res.status(200).json({
                      message: "update name was successfully done",
                      updateName
            });
            }
         
        }
        catch (error) {
            return res.status(400).json({
                error: error.message
            })
        
        }
    
    }
export const deleteWrestles = async (req, res) => {

    try {

     

            const getWrestle = await wrestlenames.findByPk(req.params.id);
           if (!getWrestle) {
                   return res.status(404).json({
                Error: "Not found",
            });
           }
            else if (req.loggedUser.email !== getWrestle.wrestleCreatorEmail) {
                    return res.status(403).json({
                     Error: "You can't delete wrestle name which is not yours",
                   });
        
        }
        
        
           else {

            const deleteWrestle = await getWrestle.destroy({});
            return res.status(200).json({
                message:"Delete wrestle name successfully done"
            }); 
        }
       
         
        }
        catch (error) {
            return res.status(400).json({
                error: error.message
            })
        
        }
    
    }