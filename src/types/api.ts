export interface Country {
    name: {
        common: string;
        official: string;
        nativeName: {
            spa: {
                official: string;
                common: string;
            }
        }
    };
    capital: string;
    altSpellings: string[]
    flags: string[];
    cca3: string;
    cca2: string;
}

export interface CountryColors {
    country: string;
    flag_colors: {
        percent: number;
        colorCode: string;
    }[]
}