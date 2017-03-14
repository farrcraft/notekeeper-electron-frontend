export default class Core {
  // openMasterDb makes an RPC call to the backend, instructing it to open the master DB
  static openMasterDb() {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = app.getPath('userData');
    const request = new messages.OpenMasterDbRequest();
    request.setPath(userDataPath);
    const client = rpc.getClient();
    client.openMasterDb(request, (err, response) => {
        const status = response.getStatus();
        if (status != 'OK') {
        dialog.showErrorBox("Fatal Error", "Could not open database.")
        app.quit();
        }
    });
  }
}
