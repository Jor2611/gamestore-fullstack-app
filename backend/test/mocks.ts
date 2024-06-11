import { Roles } from "../src/account/constants/rolePermissions";

export const mockAccount = {
  id: 1,
  fakeId: 123456789, 
  email:'test@test.com',
  updatedEmail: 'updated@test.com', 
  wrongEmail: 'wrong@mail.com',
  password: 'asd123', 
  wrongPassword: 'wrong123',
  updatedPassword: 'updated123',
  role: Roles.Customer,
  token: 'thisistoken'
};

export const mockJwtService = {
  signAsync: jest.fn().mockImplementation(() => {
    return 'thisismocktoken!';
  }),
};

export const mockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'JWT_ADMIN_EXPIRATION') return '1h';
    if (key === 'JWT_EXPIRATION') return '1h';
    if (key === 'JWT_REMEMBER_EXPIRATION') return '7d';
  }),
};

export const JWTExpirationMap = {
  'JWT_EXPIRATION': '1h',
  'JWT_ADMIN_EXPIRATION': '1h',
  'JWT_REMEMBER_EXPIRATION': '7d'
};

export const mockGames = (genres: Array<Object>, platforms: Array<Object>, size: number) => {
  const gameCollection = [];

  for(let i=1; i<=size; i++){
    const game = {
      id: i, 
      name: `Game ${i}`, 
      publisher: `Game Publisher ${i}`, 
      released: `2013-09-${i}`, 
      description: `Game Description ${i}`, 
      slug: `game_slug_${i}`, 
      background_image: `https://image_${i}.com`, 
      clip: `https://youtube.com/1das5d165awd${i}`, 
      rating: "4.9", 
      metacritic: "94", 
      gallery: ["img1", "img2"],
      platforms: platforms,
      genres: genres
    };
    gameCollection.push(game);
  }

  return gameCollection;
}

export const mockGenres = [
  { id: 1, name: "Action", label: "Action", value: "action", icon: "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg" },
  { id: 2, name: "Indie", label: "Indie", value: "indie", icon: "https://media.rawg.io/media/games/e04/e04963f3ac4c4fa83a1dc0b9231e50db.jpg" },
  { id: 3, name: "Adventure", label: "Adventure", value: "adventure", icon: "https://media.rawg.io/media/games/fd8/fd882c8267a44621a0de6f9cec77ae90.jpg" },
  { id: 4, name: "RPG", label: "RPG", value: "role-playing-games-rpg", icon: "https://media.rawg.io/media/games/62c/62c7c8b28a27b83680b22fb9d33fc619.jpg" },
  { id: 5, name: "Shooter", label: "Shooter", value: "shooter", icon: "https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg" }
];

export const mockPlatforms = [
  { id: 1, name: "PC", label: "PC", value: "pc", icon: "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg" },
  { id: 2, name: "PlayStation 5", label: "PlayStation 5", value: "playstation5", icon: "https://media.rawg.io/media/games/eb5/eb514db62d397c64288160d5bd8fd67a.jpg" },
  { id: 3, name: "PlayStation 4", label: "PlayStation 4", value: "playstation4", icon: "https://media.rawg.io/media/games/960/960b601d9541cec776c5fa42a00bf6c4.jpg" },
  { id: 4, name: "Xbox One", label: "Xbox One", value: "xbox-one", icon: "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg" },
  { id: 5, name: "Xbox Series S/X", label: "Xbox Series S/X", value: "xbox-series-x", icon: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg" }
]