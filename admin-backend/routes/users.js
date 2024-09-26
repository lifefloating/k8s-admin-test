// routes/users.js
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const router = new Router();

router.post('/register', async (ctx) => {
  const { username, email, password } = ctx.request.body;
  const user = new User({ username, email, password });
  await user.save();
  ctx.body = { user };
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid email or password' };
    return;
  }
  const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });
  ctx.body = { user, token };
});

router.get('/profile', async (ctx) => {
  const user = await User.findById(ctx.state.user.id);
  ctx.body = { user };
});

module.exports = router;