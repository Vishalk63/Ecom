const jwt = require('jsonwebtoken')
function AuthMiddleware(req,res,next){
    // const token = req.headers.authorization;

    // if (!token) {
    //     return res.status(401).json({
    //         msg: "You are not authenticated",
    //         success: false
    //     });
    // }
    // jwt.verify(token, 'secret', function(err, decoded) {
    //     if (err) {
    //         return res.status(403).json({
    //             msg: "Invalid token",
    //             success: false
    //         });
    //     }
        
    //     // `decoded` मधील `userId` सारखी महत्त्वाची माहिती रीक्वेस्ट ऑब्जेक्टमध्ये जोडा
    //     // req.userId = decoded.userId;
    //     next(); // पुढील मिडलवेअर किंवा रूट हँडलरला जा
    // });

}

export default AuthMiddleware;