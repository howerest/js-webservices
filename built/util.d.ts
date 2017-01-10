export declare module Util {
    class EnvChecker {
        static isBrowser(): boolean;
        static isNode(): boolean;
        static nodeVersion(): void;
    }
    class Cloner {
        static obj(srcObject: any): any;
    }
    class Camel {
        static camelize(obj: Object): any;
        static walk(obj: any): any;
        static camelCase(str: string): string;
        static reduce(xs: any, f: any, acc: any): any;
        static map(xs: any, f: any): any;
    }
}
