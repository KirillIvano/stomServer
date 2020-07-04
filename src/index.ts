require('module-alias/register');

import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';

import {AppModule} from './app.module';
import {configureApp} from './configureApp';

const start = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    configureApp(app);

    await app.listen(5000);
};

start();
