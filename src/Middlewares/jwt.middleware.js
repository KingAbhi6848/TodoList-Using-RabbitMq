
import jwt from 'jsonwebtoken';

const secretKey = 'secretKey'; // Replace with your actual secret key

const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        // return res.status(401).json({ message:  });
        console.log('Access denied. No token provided.');
        return res.redirect('/user/signin');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            // return res.status(403).json({ message:  });
            console.log('Invalid token.');
            return res.redirect('/user/signin');
        }

        req.user = decoded;
        console.log("decoded",decoded);
        next();
    });
};

export default jwtAuth;
