const jwt = require('jsonwebtoken');   // this package is used to create and verify JSON Web Tokens (JWTs) which are used for authentication and authorization in the application. It allows us to generate tokens that can be sent to the client and later verified to ensure that the client is authenticated and authorized to access certain resources.
const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Add to .env

function generateToken(payload) {   // payload contains the data that we want to include in the token, such as user ID and username. The secretKey is used to sign the token, ensuring its integrity and authenticity. The expiresIn option sets the token to expire after 1 hour, enhancing security by limiting the token's validity period.
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey); // to verify the token we need the secret key which is used to sign the token
  } catch (error) { // token expired  // token modified // wrong token
    return null;
  }
}

module.exports = { generateToken, verifyToken };


// Authentication and Authorization
// Authentication means verifying the identity of a user, who are you??
// Authorization means verifying the user's permissions to access certain resources or actions, i know who are you but are yo authorized to access this resource or perform this action??