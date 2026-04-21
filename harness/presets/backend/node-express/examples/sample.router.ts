import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../../common/middleware/validateBody.js';
import { sampleController } from './sample.controller.js';

export const sampleRouter = Router();

const CreateSampleBody = z.object({
  name: z.string().min(1).max(120),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
});

sampleRouter.get('/:id', sampleController.get);
sampleRouter.post('/', validateBody(CreateSampleBody), sampleController.create);
