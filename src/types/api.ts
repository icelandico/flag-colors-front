export interface Country {
  name: string;
  region: string;
  code: string;
}

export interface CountryColors {
  country: string;
  flag_colors: {
    percent: number;
    colorCode: string;
  }[];
}
