import {NestExpressApplication} from '@nestjs/platform-express';
import {HttpExceptionsFilter} from './filters/exceptions';

export const configureApp = (app: NestExpressApplication) => {
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionsFilter());
};
