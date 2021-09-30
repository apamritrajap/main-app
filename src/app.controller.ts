import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('GOLEGAL_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.client.connect();
    } catch (error) {
      throw error;
    }
  }

  @Get()
  getHello() {
    const data = {
      msg: 'please recieve this and show in console',
      test: 'testing',
    };
    // const test = this.client.emit('helloBus', heheh);
    const test = this.client.send('eventBus', data);
    test.subscribe((incomingData) => {
      console.log('---------->', incomingData);
    });
    return this.appService.getHello();
  }
}
