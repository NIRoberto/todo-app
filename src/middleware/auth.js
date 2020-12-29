import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.loggedUser = verified;

    next();
  } catch (error) {
    return res.status(400).json({
      Error: 'Invalid token',
    });
  }
};
