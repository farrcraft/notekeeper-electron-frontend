class AjaxRequest {
  certificate: Buffer|undefined;

  request() {
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
    req.open('POST', RPC_ENDPOINT, false);
    // req.setRequestHeader(name, value);
    req.send(payload);
  }
}

export default AjaxRequest;
