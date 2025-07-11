import { Role } from '@prisma/client';
export declare function DecoratorWrapper(summary: string, authRequired?: boolean, roles?: Role[]): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
