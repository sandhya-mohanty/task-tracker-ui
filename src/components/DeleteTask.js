import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

/*
  @author: Sandhyarani Mohanty
  @date: 28-Mar-2024
  This component is for delete a task
*/
const DeleteTask = (props) => {

  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);

  // This method is to delete the task
  const handleDeleteTask = () => {
    debugger
    const taskData = JSON.parse(localStorage.getItem("taskData"));
    localStorage.setItem("taskData", JSON.stringify({...taskData, [props.status]: taskData[props.status].filter((task, key) => key !== props.id)}));
    toggle();
    window.location.reload();
  };
 
  return (
    <Modal isOpen={modal} toggle={toggle} {...props}>
      <ModalHeader toggle={toggle}>Delete Task</ModalHeader>
      <ModalBody className="modal-body">
        <p>Do You want to Delete this Task</p>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteTask}>Yes</Button>{" "}
          <Button color="secondary" onClick={toggle}>No</Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default DeleteTask;
