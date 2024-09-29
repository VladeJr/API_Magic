import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  it('should return "Hello World!" and measure performance', () => {
    const start = process.hrtime(); // Inicia o cronômetro

    const result = appService.getHello(); // Chama a função

    const end = process.hrtime(start); // Calcula o tempo de execução

    // Tempo em segundos e milissegundos
    const executionTime = end[0] * 1000 + end[1] / 1e6;

    console.log(`Execution time: ${executionTime} ms`);

    expect(result).toBe('Hello World!');
    expect(executionTime).toBeLessThan(50); // Espera que o tempo de resposta seja menor que 50 ms
  });
});
