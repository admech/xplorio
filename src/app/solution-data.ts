export type XSolution = {
  name: string,
  variables: Array<{
    name: string,
    x: string,
    y: string,
    series: [number, number][]
  }>
};

export type AvailableData = {
  solutions: string[],
  variables: string[]
};

export type SelectedItems = { 
  variable: string, 
  solutions: string[]
};