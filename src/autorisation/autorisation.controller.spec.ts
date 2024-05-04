import { Test, TestingModule } from '@nestjs/testing';
import { AutorisationController } from './autorisation.controller';

describe('AutorisationController', () => {
  let controller: AutorisationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutorisationController],
    }).compile();

    controller = module.get<AutorisationController>(AutorisationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
