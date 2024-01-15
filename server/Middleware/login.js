import bcrypt from 'bcrypt';
import passport from 'passport';

export async function hashPassword(password){
  return await bcrypt.hash(password, 10);
}

export function login(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return res.status(500).json({ success: false, message: 'Internal Server Error' });
    if (!user) return res.status(401).json({ success: false, message: 'Authentication failed' });
    req.login(user, function(err) {
      if (err) return res.status(500).json({ success: false, message: 'Internal Server Error' });
      return res.status(200).json({ success: true, user: user });
    });
    
  })(req, res, next);
}
