import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: [options: import("passport-google-oauth20").StrategyOptionsWithRequest] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    authorizationParams(): Record<string, string>;
    validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any>;
}
export {};
