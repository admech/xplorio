export type XSolution = {
  name: string,
  variables: Array<{
    name: string,
    x: string,
    y: string,
    series: [number, number][]
  }>
};