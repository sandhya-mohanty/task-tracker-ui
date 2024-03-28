import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import addEditTaskErr from "../data/addEditTaskErr.json";
import status from "../data/status.json";
import { convertToBtnTextByStatus } from "../utils/common-utility";

/*
  @author: Sandhyarani Mohanty
  @date: 28-Mar-2024
  This component is for add/edit the task
*/
const AddEditTask = (args) => {

  const [modal, setModal] = useState(true);
  const [taskForm, setTaskForm] = useState({ startDate: new Date(), status: "pending"});

  useEffect(() => {
    if (args.id !== undefined) {
      setTaskForm(args);
    }
  }, [args.id]);

  const toggle = () => setModal(!modal);

  // This method is update the filterForm
  const handleTaskFormChange = (attr, val) => {
    setTaskForm({ ...taskForm, [attr]: val });
  };

  // This method is to save the task into in-memory state
  const handleTaskFormSubmit = () => {
    if(taskForm.title && taskForm.team && taskForm.priority) {
      let taskData = JSON.parse(localStorage.getItem("taskData"));
      if (taskData !== null && args.id === undefined) { // for add
        localStorage.setItem("taskData", JSON.stringify({...taskData, pending: [...taskData.pending, taskForm]}));
      } else if (args.id !== undefined) { // for edit
        if (taskForm.status === args.status) { // when status is not changed
          localStorage.setItem("taskData", JSON.stringify({...taskData, [taskForm.status]: taskData[args.status].map((item, key) => key === args.id ? taskForm : item)}));
        } else { // when status changed
          let updatedTasks = taskData[args.status].filter((task, key) => key !== args.id);
          localStorage.setItem("taskData", JSON.stringify({...taskData, 
            [args.status]: updatedTasks, [taskForm.status]: [...taskData[taskForm.status], {...taskForm, endDate : (taskForm.status === "completed" || taskForm.status === "deployed" || taskForm.status === "deferred") ? new Date() : undefined}]}));
        }
      } else {
        localStorage.setItem("taskData", JSON.stringify({ pending: [taskForm], inProgress: [], completed: [], deployed: [], deferred: []}));
      }
      toggle();
      window.location.reload();
    } else {
      setTaskForm({...taskForm, title: "", team: "", priority: ""});
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} {...args} size="lg">
      <ModalHeader toggle={toggle}>{args.id !== undefined ? "Edit Task" : "Add Task"}</ModalHeader>
      <ModalBody className="modal-body">
            <Form>
              <FormGroup row>
                <Label for="title" sm={2}>Title:<span class="req">*</span></Label>
                <Col sm={10}>
                  <Input invalid={!taskForm.title && taskForm.title === ""} onChange={(e) => handleTaskFormChange("title", e.target.value)} disabled={args.title !== undefined} value={taskForm.title} />
                  <FormFeedback>{addEditTaskErr.title}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="desc" sm={2}>Description:</Label>
                <Col sm={10}>
                  <Input onChange={(e) => handleTaskFormChange("desc", e.target.value)} disabled={args.desc !== undefined} value={taskForm.desc} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="team" sm={2}>Team:<span class="req">*</span></Label>
                <Col sm={10}>
                  <Input invalid={!taskForm.team && taskForm.team === ""} onChange={(e) => handleTaskFormChange("team", e.target.value)} disabled={args.team !== undefined} value={taskForm.team} />
                  <FormFeedback>{addEditTaskErr.team}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="assignee" sm={2}>Assignee:</Label>
                <Col sm={10}>
                  <Input onChange={(e) => handleTaskFormChange("assignee", e.target.value)} disabled={args.assignee !== undefined} value={taskForm.assignee} />
                </Col>
              </FormGroup>

              <FormGroup row>
               <Label for="priority" sm={2}>Priority:<span class="req">*</span></Label>
                <Col sm={3}>
                  <Input invalid={!taskForm.priority && taskForm.priority === ""} onChange={(e) => handleTaskFormChange("priority", e.target.value)} value={taskForm.priority} type="select">
                    <option value="">-- Select --</option>
                    <option value="0">P0</option>
                    <option value="1">P1</option>
                    <option value="2">P2</option>
                  </Input>
                  <FormFeedback>{addEditTaskErr.priority}</FormFeedback>
                </Col> 
              </FormGroup>

              {taskForm.id !== undefined && (
                <FormGroup row>
                  <Label sm={2}>Status:</Label>
                  <Col sm={3}>
                    <Input onChange={(e) => handleTaskFormChange("status", e.target.value)} value={taskForm.status} type="select">
                      {status.map((item, key) => (
                        <option value={item}>{convertToBtnTextByStatus(item)}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
              )}
            </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={() => handleTaskFormSubmit()}>Submit</Button>&emsp;
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditTask;
