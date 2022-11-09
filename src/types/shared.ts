export type Cordinates = {
  x: number;
  y: number;
};

export type ForcastDetails = {
  forcastTitle: string;
  xTitle: string;
  yTitle: string;
};

export type Forcast = {
  details: ForcastDetails;
  data: Array<Cordinates>;
  date: string;
  id: number;
};
