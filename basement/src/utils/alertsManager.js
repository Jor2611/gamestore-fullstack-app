import { toast } from "react-toastify";

//Any message found here will emit a notification
export const alertsMap = new Map([
  ['GAME_CREATED', { type: 'success', color: 'green.600', message: 'New Game Created!' }],
  ['GAME_UPDATED', { type: 'success', color: 'green.600', message: 'Game Updated!' }],
  ['GAME_REMOVED', { type: 'success', color: 'green.600', message: 'Game Removed!' }],
  ['GAME_DOESN\'T_EXIST', { type: 'error', color: 'blue', message: 'Game not found!' }],
  ['ROW_LOCKED_TOO_LONG', { type: 'error', color: 'red.700', message: 'Entity currently processing!' }],
  ['SERVER_ERROR', { type: 'error', color: 'red.700', message: 'Something went wrong, try later!' }],
  ['ACCOUNT_LOGGEDIN', { type: 'success', color: 'green.700', message: 'Signed in successfuly!' }],
  ['SESSION_EXPIRED', { type: 'error', color: 'red.700', message: 'Session Expired!' }],
  ['UNAUTHORIZED', { type: 'error', color: 'red.700', message: 'Session Expired!' }],
  ['3RD_PARTY_ISSUE', { type: 'error', color: 'red.700', message: 'Issues on API\'s side, try again!' }]
]);

export const showAlert = (responseMessage) => {
  const responseAlert = alertsMap.get(responseMessage.toUpperCase());
  if(responseAlert){
    toast(responseAlert.message, {
      type: responseAlert.type,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};