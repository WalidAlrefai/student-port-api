'use strict';

function acl(action){
    return (req , res, next) =>{
        try{
            if(req.user.actions.includes(action)){
                next();
            }else{
                next('access denied')
            }
        }catch{
            res.ststus(403).send('invaled role');
        }
    }
}

module.exports = acl;