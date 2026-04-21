declare module "recharts/es6/hooks.js" {
  export function usePlotArea(): {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  } | undefined;
}
