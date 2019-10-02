import { Endpoint } from '../Rpc';
import Client from './Client';

class AjaxClient extends Client {
  request(method: string, payload: Uint8Array): Promise<string> {
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      try {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status === 200) {
            // req.responseText
          } else {

          }
        }
      } catch (err) {

      }
    };
    // 3rd param = async - true/false
    req.open('POST', Endpoint.endpoint, false);
    // req.setRequestHeader(name, value);
    req.send(payload);
  }
}

export default AjaxClient;
