import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return "Hello World" and measure performance', () => {
    const start = process.hrtime(); // Inicia o cronômetro

    const result = appController.getHello(); // Chama a função

    const end = process.hrtime(start); // Calcula o tempo de execução

    // Tempo em segundos e milissegundos
    const executionTime = end[0] * 1000 + end[1] / 1e6;

    console.log(`Execution time: ${executionTime} ms`);

    expect(result).toBe('Hello World');
    expect(executionTime).toBeLessThan(100); // Exemplo: espera que o tempo de resposta seja menor que 100 ms
  });
});
