export const LOCATIONS = [
  "doncaster",
  "durham",
  "lincoln",
  "liverpool",
  "manchester",
  "preston",
  "ripon",
  "salford",
  "sheffield",
  "sunderland",

  "wakefield",
  "castleford",
  "pontefract",

  "worcester",
  "wetherby",
  "harrogate",
  "knaresborough",
  "garforth",
  "rothwell",

  "yorkshire",
  "lancashire",
  "leeds",
  "bradford",
  "harrogate",
  "horsforth",
  "bingley",
  "shipley",
  "ilkley",
  "otley",
  "skipton",


  "york",
    "Selby",
    "Malton",
    "Tadcaster", 
    "Pocklington",
    "Elvington",
    "Welburn",
    "Stamford-Bridge",
    "Towton",
    "wetherby",

  "ripon",
    "thirsk",
    "masham",
    "boroughbridge", 



];

export const NEARBY_LOCATIONS: Record<string, string[]> = {
  default: [
    "leeds",
    "manchester",
    "york",
    "sheffield",
    "bradford",
    "huddersfield",
  ],
  leeds: [
    "york",
    "bradford",
    "harrogate",
    "knaresborough",
    "garforth",
    "rothwell",

    "horsforth",
    "bingley",
    "ilkley",
    "otley",
    "skipton",
    "wetherby",
  ],
  bradford: [
    "leeds",
    "harrogate",
    "horsforth",
    "bingley",
    "shipley",
    "ilkley",
    "otley",
    "skipton",
    "wetherby",
  ],
    
    york: [
      "selby",
      "malton",
      "tadcaster", 
      "pocklington",
      "elvington",
      "welburn",
      "stamford-Bridge",
      "towton",
      "wetherby",
      "leeds",
    ],

    ripon: [
      "thirsk",
      "masham",
      "boroughbridge", 
      "leeds",
      "york",


      ],


};
