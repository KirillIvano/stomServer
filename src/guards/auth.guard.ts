import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';

import {ADMIN_PASSWORD} from '~/settings/creds';


const validatePassword = (password: string) => password === ADMIN_PASSWORD;

@Injectable()
export class PasswordGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request<never, never, never, {_password: string}>>();

        const {_password: password} = request.query;

        return validatePassword(password);
    }
}
