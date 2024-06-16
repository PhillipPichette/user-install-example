import { ReadFromFile, WritetoFile } from "./jsonIO.js";
import { capitalize } from "./utils.js";

export function getProfileByName(name) {
    const users = ReadFromFile('data/users.json')
    // get existing user
    var existing = users.find(u => u.username == name)
    if(!existing){
        existing = AddProfile(name)
    }

    // const profile = playerProfiles.find(p => p.username == name)
    return existing
}

export function AddProfile(user, favorite){
    const users = ReadFromFile('data/users.json')
    const newU = {username: user, favorites: favorite ? [favorite] : []}
    users.push(newU)
    WritetoFile('data/users.json', users)
    return newU
}

export function AddFavorite(user, favorite){

    favorite = capitalize(favorite)

    // get all users
    const users = ReadFromFile('data/users.json')
    // get all legends
    const legends = ReadFromFile('data/legends.json')
    // get matching legend

    const legend = legends.find(l => l.name == favorite)
    if(!legend){
        return { title: 'Invalid legend', message: `The legend '${favorite}' does not exist` }
    }
    // format favorite for user json
    const newFav = { name: legend.name, value: `${legend.weapons[0]}, ${legend.weapons[1]}`, inline: false}
    // get existing user
    const existing = users.find(u => u.username == user)
    
    if(!existing){
        AddProfile(user, newFav)
    } else {
        if(!existing.favorites.find(l => l.name == newFav.name)){
            existing.favorites.push(newFav)
            WritetoFile('data/users.json', users)
        } else {
            console.log("legend already favorited")
        }
    }
}

export function RemoveFavorite(user, favorite){

    favorite = capitalize(favorite)

    // get all users
    const users = ReadFromFile('data/users.json')
    // get all legends
    const legends = ReadFromFile('data/legends.json')
    // get matching legend

    const legend = legends.find(l => l.name == favorite)
    if(!legend){
        return { title: 'Invalid legend', message: `The legend '${favorite}' does not exist` }
    }
    // format favorite for user json
    const newFav = { name: legend.name, value: `${legend.weapons[0]}, ${legend.weapons[1]}`, inline: false}
    // get existing user
    const existing = users.find(u => u.username == user)
    
    if(!existing){
        AddProfile(user, newFav)
    } else {
        if(existing.favorites.find(l => l.name == newFav.name)){
            existing.favorites = existing.favorites.filter(l => l.name != favorite)
            WritetoFile('data/users.json', users)
        } else {
            console.log("legend not favorited")
        }
        
    }

}

export function getUsername(p) {
    const users = getUsers()
  const position = p
    ? p
    : Math.floor(Math.random() * users.length);
  return users[position].username;
}

export function getRandom(type, param = null) {
    var legends = null
    if(type == 'all'){
        legends = getLegends()
    } else if( type == 'weapon'){
        legends = getLegendsFromWeapon(param)
    } else if( type =='favorite'){
        legends = getLegendsFromFavorite(param)
        console.log(legends)
        if(legends == 'error') return 'error'
    }

    // @ts-ignore
    var int = Math.floor(Math.random() * (legends.length - 1));
    // @ts-ignore
    return legends[int];
}

export function getLegendsFromWeapon(weap){
    const legends = getLegends().filter(p => p.weapons.includes(weap) )
    return legends
}
export function getLegendsFromFavorite(user){

    const currUser = getUsers().find(u => u.username == user)
    // console.log(currUser)
    // console.log(currUser.favorites.length)

    var val = null;
    if(currUser.favorites.length === 0){
        val = 'error'
    }else{
        val = currUser.favorites.map(favorite =>
        getLegends().find(legend => legend.name === favorite.name)
        ).filter(legend => legend !== undefined);
    }
    return val
}



// profile data for game
export const playerProfiles = [
  {
    username: 'Frenchiest Fry',
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
  {
    username: 'schquid',
    favorites: [
      {
        name: 'Mordex',
        value: 'Scythe, Gauntlets',
        inline: false
      },
      {
        name: 'Jiro',
        value: 'Sword, Scythe',
        inline: false
      },
    ]
  },
];

export const weaponChoice = [
    {
      name: 'Axe',
      value: 'Axe'
    },
    {
      name: 'Battle Boots',
      value: 'Battle Boots'
    },
    {
      name: 'Blasters',
      value: 'Blasters'
    },
    {
      name: 'Bow',
      value: 'Bow'
    },
    {
      name: 'Cannon',
      value: 'Cannon'
    },
    {
      name: 'Gauntlets',
      value: 'Gauntlets'
    },
    {
      name: 'Greatsword',
      value: 'Greatsword'
    },
    {
      name: 'Hammer',
      value: 'Hammer'
    },
    {
      name: 'Katars',
      value: 'Katars'
    },
    {
      name: 'Orb',
      value: 'Orb'
    },
    {
      name: 'Rocket Lance',
      value: 'Rocket lance'
    },
    {
      name: 'Scythe',
      value: 'Scythe'
    },
    {
      name: 'Spear',
      value: 'Spear'
    },
    {
      name: 'Sword',
      value: 'Sword'
    }
]

// legends
// export const gameRandom = ReadFromFile('data/legends.json')
export function getLegends(){
    return ReadFromFile('data/legends.json')
}

// [
// {
//     name: 'Bodvar',
//     img: 'Bodvar',
//     weapons: ['Sword', 'Hammer']
// },
// {
//     name: 'Cassidy',
//     img: 'Cassidy',
//     weapons: ['Blasters', 'Hammer']
// },
// {
//     name: 'Orion',
//     img: 'Orion',
//     weapons: ['Rocket Lance', 'Spear']
// },
// {
//     name: 'Lord Vraxx',
//     img: 'LordVraxx',
//     weapons: ['Blasters', 'Rocket Lance']
// },
// {
//     name: 'Gnash',
//     img: 'Gnash',
//     weapons: ['Hammer', 'Spear']
// },
// {
//     name: 'Queen Nai',
//     img: 'QueenNai',
//     weapons: ['Spear', 'Katars']
// },
// {
//     name: 'Hattori',
//     img: 'Hattori',
//     weapons: ['Sword', 'Spear']
// },
// {
//     name: 'Sir Roland',
//     img: 'SirRoland',
//     weapons: ['Sword', 'Rocket Lance']
// },
// {
//     name: 'Scarlet',
//     img: 'Scarlet',
//     weapons: ['Hammer', 'Rocket Lance']
// },
// {
//     name: 'Thatch',
//     img: 'Thatch',
//     weapons: ['Sword', 'Blasters']
// },
// {
//     name: 'Ada',
//     img: 'Ada',
//     weapons: ['Blasters', 'Spear']
// },
// {
//     name: 'Sentinel',
//     img: 'Sentinel',
//     weapons: ['Hammer', 'Katars']
// },
// {
//     name: 'Lucien',
//     img: 'Lucien',
//     weapons: ['Blasters', 'Katars']
// },
// {
//     name: 'Teros',
//     img: 'Teros',
//     weapons: ['Axe', 'Hammer']
// },
// {
//     name: 'Brynn',
//     img: 'Brynn',
//     weapons: ['Axe', 'Spear']
// },
// {
//     name: 'Asuri',
//     img: 'Asuri',
//     weapons: ['Sword', 'Katars']
// },
// {
//     name: 'Barraza',
//     img: 'Barraza',
//     weapons: ['Blasters', 'Axe']
// },
// {
//     name: 'Ember',
//     img: 'Ember',
//     weapons: ['Bow', 'Katars']
// },
// {
//     name: 'Azoth',
//     img: 'Azoth',
//     weapons: ['Bow', 'Axe']
// },
// {
//     name: 'Koji',
//     img: 'Koji',
//     weapons: ['Bow', 'Sword']
// },
// {
//     name: 'Ulgrim',
//     img: 'Ulgrim',
//     weapons: ['Axe', 'Rocket Lance']
// },
// {
//     name: 'Diana',
//     img: 'Diana',
//     weapons: ['Bow', 'Blasters']
// },
// {
//     name: 'Jhala',
//     img: 'Jhala',
//     weapons: ['Sword', 'Axe']
// },
// {
//     name: 'Kor',
//     img: 'Kor',
//     weapons: ['Gauntlets', 'Hammer']
// },
// {
//     name: 'Wu Shang',
//     img: 'WuShang',
//     weapons: ['Gauntlets', 'Spear']
// },
// {
//     name: 'Val',
//     img: 'Val',
//     weapons: ['Gauntlets', 'Sword']
// },
// {
//     name: 'Ragnir',
//     img: 'Ragnir',
//     weapons: ['Katars', 'Axe']
// },
// {
//     name: 'Cross',
//     img: 'Cross',
//     weapons: ['Blasters', 'Gauntlets']
// },
// {
//     name: 'Mirage',
//     img: 'Mirage',
//     weapons: ['Spear', 'Scythe']
// },
// {
//     name: 'Nix',
//     img: 'Nix',
//     weapons: ['Blasters', 'Scythe']
// },
// {
//     name: 'Mordex',
//     img: 'Mordex',
//     weapons: ['Gauntlets', 'Scythe']
// },
// {
//     name: 'Yumiko',
//     img: 'Yumiko',
//     weapons: ['Bow', 'Hammer']
// },
// {
//     name: 'Artemis',
//     img: 'Artemis',
//     weapons: ['Rocket Lance', 'Scythe']
// },
// {
//     name: 'Caspian',
//     img: 'Caspian',
//     weapons: ['Katars', 'Gauntlets']
// },
// {
//     name: 'Sidra',
//     img: 'Sidra',
//     weapons: ['Cannon', 'Sword']
// },
// {
//     name: 'Xull',
//     img: 'Xull',
//     weapons: ['Axe', 'Cannon']
// },
// {
//     name: 'Kaya',
//     img: 'Kaya',
//     weapons: ['Spear', 'Bow']
// },
// {
//     name: 'Isaiah',
//     img: 'Isaiah',
//     weapons: ['Cannon', 'Blasters']
// },
// {
//     name: 'Jiro',
//     img: 'Jiro',
//     weapons: ['Sword', 'Scythe']
// },
// {
//     name: 'Lin Fei',
//     img: 'LinFei',
//     weapons: ['Katars', 'Cannon']
// },
// {
//     name: 'Zariel',
//     img: 'Zariel',
//     weapons: ['Gauntlets', 'Bow']
// },
// {
//     name: 'Rayman',
//     img: 'Rayman',
//     weapons: ['Gauntlets', 'Axe']
// },
// {
//     name: 'Dusk',
//     img: 'Dusk',
//     weapons: ['Spear', 'Orb']
// },
// {
//     name: 'Fait',
//     img: 'Fait',
//     weapons: ['Scythe', 'Orb']
// },
// {
//     name: 'Thor',
//     img: 'Thor',
//     weapons: ['Hammer', 'Orb']
// },
// {
//     name: 'Petra',
//     img: 'Petra',
//     weapons: ['Gauntlets', 'Orb']
// },
// {
//     name: 'Vector',
//     img: 'Vector',
//     weapons: ['Rocket Lance', 'Bow']
// },
// {
//     name: 'Volkov',
//     img: 'Volkov',
//     weapons: ['Axe', 'Scythe']
// },
// {
//     name: 'Onyx',
//     img: 'Onyx',
//     weapons: ['Gauntlets', 'Cannon']
// },
// {
//     name: 'Jaeyun',
//     img: 'Jaeyun',
//     weapons: ['Greatsword', 'Sword']
// },
// {
//     name: 'Mako',
//     img: 'Mako',
//     weapons: ['Greatsword', 'Katars']
// },
// {
//     name: 'Magyar',
//     img: 'Magyar',
//     weapons: ['Greatsword', 'Hammer']
// },
// {
//     name: 'Reno',
//     img: 'Reno',
//     weapons: ['Blasters', 'Orb']
// },
// {
//     name: 'Munin',
//     img: 'Munin',
//     weapons: ['Bow', 'Scythe']
// },
// {
//     name: 'Arcadia',
//     img: 'Arcadia',
//     weapons: ['Greatsword', 'Spear']
// },
// {
//     name: 'Ezio',
//     img: 'Ezio',
//     weapons: ['Sword', 'Orb']
// },
// {
//     name: 'Tezca',
//     img: 'Tezca',
//     weapons: ['Gauntlets', 'Battle Boots']
// },
// {
//     name: 'Thea',
//     img: 'Thea',
//     weapons: ['Battle Boots', 'Rocket Lance']
// },
// {
//     name: 'Red Raptor',
//     img: 'RedRaptor',
//     weapons: ['Battle Boots', 'Orb']
// },
// {
//     name: 'Loki',
//     img: 'Loki',
//     weapons: ['Scythe', 'Katars']
// },
// {
//   name: 'Seven',
//   img: 'Seven',
//   weapons: ['Spear', 'Cannon']
// },
// {
//     name: 'Vivi',
//     img: 'Vivi',
//     weapons: ['Battle Boots', 'Blasters']
// }
// ];

export function getUsers(){
    return ReadFromFile('data/users.json')
}