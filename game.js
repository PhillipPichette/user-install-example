export function getProfileByName(name) {
  // const position = p
  //   ? p
  //   : Math.floor(Math.random() * playerProfiles.length);

  // console.log("USERNAME: "+name)
  const profile = playerProfiles.find(p => p.username == name)
  // console.log(JSON.stringify(playerProfiles))
  // console.log(JSON.stringify(profile, null, 1));

  // return playerProfiles[p];
  return profile
}

export function getUsername(p) {
  const position = p
    ? p
    : Math.floor(Math.random() * playerProfiles.length);
  return playerProfiles[position].username;
}

export function getRandom(int) {
  return gameRandom[int];
}

// profile data for game
export const playerProfiles = [
  {
    username: 'Frenchiest Fry',
    createdAt: '06/12/2024',
    lastPlayed: '06/12/2024',
    favorites: [
      {
        name: 'Brynn',
        value: 'Axe, Spear',
        inline: false
      },
      {
        name: 'Hattori',
        value: 'Sword, Spear',
        inline: false
      },
      {
        name: 'Rayman',
        value: 'Axe, Gauntlets',
        inline: false
      },
    ]
  },
  {
    username: 'Winnie',
    createdAt: '06/13/2024',
    lastPlayed: '06/13/2024',
    favorites: [
      {
        name: 'Loki',
        value: 'Scythe, Katars',
        inline: false
      },
      {
        name: 'Thor',
        value: 'Orb, Hammer',
        inline: false
      },
    ]
  },
];

export const randomChoice = [
  {
    name: 'All', 
    value: 'all'
  }, 
  {
    name: 'Favorite',
    value: 'favorite'
  }
]

// weapons
export const gameRandom = [
  {
    name: 'Bodvar',
    weapons: ['Sword', 'Hammer']
},
{
    name: 'Cassidy',
    weapons: ['Blasters', 'Hammer']
},
{
    name: 'Orion',
    weapons: ['Rocket Lance', 'Spear']
},
{
    name: 'Lord Vraxx',
    weapons: ['Blasters', 'Rocket Lance']
},
{
    name: 'Gnash',
    weapons: ['Hammer', 'Spear']
},
{
    name: 'Queen Nai',
    weapons: ['Spear', 'Katars']
},
{
    name: 'Hattori',
    weapons: ['Sword', 'Spear']
},
{
    name: 'Sir Roland',
    weapons: ['Sword', 'Rocket Lance']
},
{
    name: 'Scarlet',
    weapons: ['Hammer', 'Rocket Lance']
},
{
    name: 'Thatch',
    weapons: ['Sword', 'Blasters']
},
{
    name: 'Ada',
    weapons: ['Blasters', 'Spear']
},
{
    name: 'Sentinel',
    weapons: ['Hammer', 'Katars']
},
{
    name: 'Lucien',
    weapons: ['Blasters', 'Katars']
},
{
    name: 'Teros',
    weapons: ['Axe', 'Hammer']
},
{
    name: 'Brynn',
    weapons: ['Axe', 'Spear']
},
{
    name: 'Asuri',
    weapons: ['Sword', 'Katars']
},
{
    name: 'Barraza',
    weapons: ['Blasters', 'Axe']
},
{
    name: 'Ember',
    weapons: ['Bow', 'Katars']
},
{
    name: 'Azoth',
    weapons: ['Bow', 'Axe']
},
{
    name: 'Koji',
    weapons: ['Bow', 'Sword']
},
{
    name: 'Ulgrim',
    weapons: ['Axe', 'Rocket Lance']
},
{
    name: 'Diana',
    weapons: ['Bow', 'Blasters']
},
{
    name: 'Jhala',
    weapons: ['Sword', 'Axe']
},
{
    name: 'Kor',
    weapons: ['Gauntlets', 'Hammer']
},
{
    name: 'Wu Shang',
    weapons: ['Gauntlets', 'Spear']
},
{
    name: 'Val',
    weapons: ['Gauntlets', 'Sword']
},
{
    name: 'Ragnir',
    weapons: ['Katars', 'Axe']
},
{
    name: 'Cross',
    weapons: ['Blasters', 'Gauntlets']
},
{
    name: 'Mirage',
    weapons: ['Spear', 'Scythe']
},
{
    name: 'Nix',
    weapons: ['Blasters', 'Scythe']
},
{
    name: 'Mordex',
    weapons: ['Gauntlets', 'Scythe']
},
{
    name: 'Yumiko',
    weapons: ['Bow', 'Hammer']
},
{
    name: 'Artemis',
    weapons: ['Rocket Lance', 'Scythe']
},
{
    name: 'Caspian',
    weapons: ['Katars', 'Gauntlets']
},
{
    name: 'Sidra',
    weapons: ['Cannon', 'Sword']
},
{
    name: 'Xull',
    weapons: ['Axe', 'Cannon']
},
{
    name: 'Kaya',
    weapons: ['Spear', 'Bow']
},
{
    name: 'Isaiah',
    weapons: ['Cannon', 'Blasters']
},
{
    name: 'Jiro',
    weapons: ['Sword', 'Scythe']
},
{
    name: 'Lin Fei',
    weapons: ['Katars', 'Cannon']
},
{
    name: 'Zariel',
    weapons: ['Gauntlets', 'Bow']
},
{
    name: 'Rayman',
    weapons: ['Gauntlets', 'Axe']
},
{
    name: 'Dusk',
    weapons: ['Spear', 'Orb']
},
{
    name: 'Fait',
    weapons: ['Scythe', 'Orb']
},
{
    name: 'Thor',
    weapons: ['Hammer', 'Orb']
},
{
    name: 'Petra',
    weapons: ['Gauntlets', 'Orb']
},
{
    name: 'Vector',
    weapons: ['Rocket Lance', 'Bow']
},
{
    name: 'Volkov',
    weapons: ['Axe', 'Scythe']
},
{
    name: 'Onyx',
    weapons: ['Gauntlets', 'Cannon']
},
{
    name: 'Jaeyun',
    weapons: ['Greatsword', 'Sword']
},
{
    name: 'Mako',
    weapons: ['Greatsword', 'Katars']
},
{
    name: 'Magyar',
    weapons: ['Greatsword', 'Hammer']
},
{
    name: 'Reno',
    weapons: ['Blasters', 'Orb']
},
{
    name: 'Munin',
    weapons: ['Bow', 'Scythe']
},
{
    name: 'Arcadia',
    weapons: ['Greatsword', 'Spear']
},
{
    name: 'Ezio',
    weapons: ['Sword', 'Orb']
},
{
    name: 'Tezca',
    weapons: ['Gauntlets', 'Battle Boots']
},
{
    name: 'Thea',
    weapons: ['Battle Boots', 'Rocket Lance']
},
{
  name: 'Red Raptor',
  weapons: ['Battle Boots', 'Orb']
},
{
    name: 'Loki',
    weapons: ['Scythe', 'Katars']
},
{
  name: 'Seven',
  weapons: ['Spear', 'Cannon']
},
{
    name: 'Vivi',
    weapons: ['Battle Boots', 'Blasters']
}
];
