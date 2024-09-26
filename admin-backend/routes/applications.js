const Router = require('koa-router');
const { exec } = require('child_process');
const Application = require('../models/Application');

const router = new Router();

// Deploy an application
router.post('/clusters/:id/applications', async (ctx) => {
  const { appName } = ctx.request.body;
  const command = `sudo docker exec -it kubeasz /bin/bash -c "kubectl create deployment ${appName} --image=myimage"`;
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      ctx.status = 500;
      ctx.body = { error: stderr };
      return;
    }
    // Save the application to the database
    const application = new Application({ appName, clusterId: ctx.params.id });
    await application.save();
    ctx.status = 201;
    ctx.body = { message: stdout, application };
  });
});

// View all applications in a cluster
router.get('/clusters/:id/applications', async (ctx) => {
  const applications = await Application.find({ clusterId: ctx.params.id });
  ctx.body = { applications };
});

// Update an application
router.put('/clusters/:id/applications/:appId', async (ctx) => {
  const { appName } = ctx.request.body;
  const command = `sudo docker exec -it kubeasz /bin/bash -c "kubectl set image deployment/${appName} mycontainer=myimage:latest"`;
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      ctx.status = 500;
      ctx.body = { error: stderr };
      return;
    }
    // Update the application in the database
    const application = await Application.findByIdAndUpdate(ctx.params.appId, { appName }, { new: true });
    ctx.body = { message: stdout, application };
  });
});

// Delete an application
router.delete('/clusters/:id/applications/:appId', async (ctx) => {
  const application = await Application.findById(ctx.params.appId);
  if (!application) {
    ctx.status = 404;
    ctx.body = { error: 'Application not found' };
    return;
  }
  const command = `sudo docker exec -it kubeasz /bin/bash -c "kubectl delete deployment ${application.appName}"`;
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      ctx.status = 500;
      ctx.body = { error: stderr };
      return;
    }
    // Delete the application from the database
    await Application.findByIdAndDelete(ctx.params.appId);
    ctx.status = 204;
  });
});

module.exports = router;