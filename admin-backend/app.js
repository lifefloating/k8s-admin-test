const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const jwt = require('koa-jwt');
const cors = require('@koa/cors');
const config = require('./config');

const app = new Koa();
const router = new Router();

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser());
app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/api\/(register|login)/] }));

// Routes
const userRoutes = require('./routes/users');
const clusterRoutes = require('./routes/clusters');
// const nodeRoutes = require('./routes/nodes');
const applicationRoutes = require('./routes/applications');
const kubectlRoutes = require('./routes/kubectl');

router.use('/api', userRoutes.routes());
router.use('/api', clusterRoutes.routes());
// router.use('/api', nodeRoutes.routes());
router.use('/api', applicationRoutes.routes());
router.use('/api', kubectlRoutes.routes());

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));