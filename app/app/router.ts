import { Application } from 'egg'

const router = (app: Application) => {
  const { controller, router } = app;

  router.get('api/', controller.home.index);

  // file
  router.post('/api/file/upload', controller.file.upload);
}

export default router
