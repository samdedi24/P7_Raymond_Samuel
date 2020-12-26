const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { 
    try {
        //On prend le token de la requete
        const token = req.headers.authorization.split(' ')[1]; 
        //On le decode grace au TOKEN SECRET
        const decodedToken = jwt.verify(token, 'secret'); 
        //On extrait l'user id du TOKEN
        const userId = decodedToken.sub;   
        //On compare avec celui de la requete      
            next(); //Si juste on passe au middleware suivant
        
    } catch (error) {
        res.status(401).json({ error: new Error('Invalid request !') });
    }
};