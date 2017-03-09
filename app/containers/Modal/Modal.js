import React, { Component, PropTypes } from 'react';
import './modal.scss';

/*
$(function() {
  $("#modal-1").on("change", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
    }
  });

  $(".modal-fade-screen, .modal-close").on("click", function() {
    $(".modal-state:checked").prop("checked", false).change();
  });

  $(".modal-inner").on("click", function(e) {
    e.stopPropagation();
  });
});
*/

export default class Modal extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="modal">
        <label htmlFor="modal-1">
          <div className="modal-trigger">Click for Modal</div>
        </label>
        <input className="modal-state" id="modal-1" type="checkbox" />
        <div className="modal-fade-screen">
          <div className="modal-inner">
            <div className="modal-close" htmlFor="modal-1" />
            <h1>{title}</h1>
            <p className="modal-intro" />
            <p className="modal-content">{children}</p>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
};
