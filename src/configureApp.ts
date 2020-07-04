import {NestExpressApplication} from '@nestjs/platform-express';
import {ValidationPipe} from '@nestjs/common';
import bodyParser from 'body-parser';

import {HttpExceptionsFilter} from './filters/exceptions';

export const configureApp = (app: NestExpressApplication) => {
    app.enableCors();

    app.useGlobalFilters(new HttpExceptionsFilter());

    app.useGlobalPipes(
        new ValidationPipe(),
    );

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
};
