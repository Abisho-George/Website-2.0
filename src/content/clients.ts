/**
 * Past clients whose logos the homepage shows. Files live in /public/clients,
 * trimmed to the artwork with a transparent ground. `h` is the display height
 * in pixels: wordmarks with a tall mark need less height than flat ones to
 * look the same size.
 */
export const clients: { name: string; src: string; w: number; h: number }[] = [
  { name: "Speridian Technologies", src: "/clients/speridian.png", w: 646, h: 160 },
  { name: "SOAIS", src: "/clients/soais.png", w: 171, h: 32 },
  { name: "askmeidentity", src: "/clients/askmeidentity.png", w: 171, h: 30 },
  { name: "Bio Supply Management Alliance", src: "/clients/bsma.png", w: 487, h: 136 },
  { name: "Retigence", src: "/clients/retigence.png", w: 250, h: 71 },
];
