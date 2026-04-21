import { AppError } from '../../common/errors/AppError.js';
import { sampleRepository } from './sample.repository.js';

export type Priority = 'low' | 'normal' | 'high';

export interface CreateSampleInput {
  name: string;
  priority?: Priority;
}

export const sampleService = {
  async get(id: number) {
    const sample = await sampleRepository.findById(id);
    if (!sample) throw new AppError('sample.not_found', 'Sample not found', 404);
    return sample;
  },

  async create(input: CreateSampleInput) {
    return sampleRepository.create({
      name: input.name,
      priority: input.priority ?? 'normal',
    });
  },
};
