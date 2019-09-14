import React, { Component } from 'react';
import Modal from 'react-modal';

class NotebookTitle extends Component {
  render() {
    return (
      <Modal isOpen={false}>
        <h2>Notebook Title</h2>
        <input type="text" />
        <div className="title-format" />
        <button type="submit">Save</button>
      </Modal>
    );
  }
}

export default NotebookTitle;
