import React, { Component } from 'react';
import Modal from 'react-modal';

class NotebookTitle extends Component {
  render() {
    return (
      <Modal
        isOpen={false}
      >
        <h2>Notebook</h2>
        <input type="text" />
        <button>Save</button>
      </Modal>
    );
  }
}

export default NotebookTitle;
