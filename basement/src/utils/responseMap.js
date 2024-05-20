export const responseMap = new Map([
  ['GAMES_FETCHED', { color: 'green.600', message: 'Games Fetched!' }],
  ['GAME_FETCHED', { color: 'green.600', message: 'Game Fetched!' }],
  ['GAME_CREATED', { color: 'green.600', message: 'New Game Created!' }],
  ['GAME_UPDATED', { color: 'green.600', message: 'Game Updated!' }],
  ['GAME_REMOVED', { color: 'green.600', message: 'Game Removed!' }],
  ['GAME_DOESN\'T_EXIST', { color: 'blue', message: 'Game not found!' }],
  ['ROW_LOCKED_TOO_LONG', { color: 'red.700', message: 'Entity currently processing!' }],
  ['SERVER_ERROR', { color: 'red.700', message: 'Something went wrong, try later!' }],
  ['ACCOUNT_LOGGEDIN', { color: 'green.700', message: 'Signed in successfuly!' }],
  ['SESSION_EXPIRED', { color: 'red.700', message: 'Session Expired!' }],
  ['3RD_PARTY_ISSUE', { color: 'red.700', message: 'Issues on API\'s side, try again!' }]
]);