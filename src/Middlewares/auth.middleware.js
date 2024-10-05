const auth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/user/signin');
  }
  next();
};
export default auth;