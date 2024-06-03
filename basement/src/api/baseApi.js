import axios from "axios";
import { showAlert } from "../utils/alertsManager";
import { eventEmitter } from "../utils/eventEmitter";

export const didAbort = (error) => axios.isCancel(error) && { aborted: true };
export const isApiError = (error) => axios.isAxiosError(error);

const getCancelSource = () => axios.CancelToken.source();


const withAbort = (fn) => {
  const executor = async (...args) => { //url,body?,config
    const originalConfig = args[args.length - 1]; //config
    const { abort, ...config } = originalConfig;

    if (typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (error) {
      console.log("api error", error);

      if (didAbort(error)) {
        console.log("CANCAELLED")
        error.aborted = true;
      }

      throw error;
    }
  };

  return executor;
};

const withAlert = (promise) => {
  return promise.then((response) => {
    if(response.data.msg){
      showAlert(response.data.msg)
    }

    return response;
  }).catch(error => {

    if(error.response.status === 401){
      error.response.data.msg = 'SESSION_EXPIRED';
      eventEmitter.emit('unauthorized');
    }

    if(error.response.data.msg){
      showAlert(error.response.data.msg);
    }

    throw error;
  })
}

const api = axios => ({
  get: (url, config = {}) => withAlert(withAbort(axios.get)(url, config)),
  post: (url, body, config = {}) => withAlert(withAbort(axios.post)(url, body, config)),
  patch: (url, body, config = {}) => withAlert(withAbort(axios.patch)(url, body, config)),
  put: (url, body, config = {}) => withAlert(withAbort(axios.put)(url, body, config)),
  delete: (url, config = {}) => withAlert(withAbort(axios.delete)(url, config))
});

export default api;