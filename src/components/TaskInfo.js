import React, { useState } from "react";
import { Badge, Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import AddEditTask from "./AddEditTask";
import DeleteTask from "./DeleteTask";
import { convertToBtnTextByStatus } from "../utils/common-utility";

/*
  @author: Sandhyarani Mohanty
  @date: 28-Mar-2024
  This component is for displaying particular task dertails
*/
const TaskInfo = (props) => {

  const [showStatus, setShowStatus] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);

  const handleIconClick = () => {
    setShowStatus(!showStatus);
  };

  return (
    <>
      <div className="task-body">
        <div className="task-title">
          <span>{props.title}</span>
          <Badge color="primary">{`${props.priority === "0" ? 'P0' : props.priority === "1" ? 'P1' : "P2"}`}</Badge>
        </div>
        <hr />
        <div>{props.desc}</div>
        <div className="task-assignName">
          <div>{props.assignee}</div>
          <Badge color="primary">
            <UncontrolledDropdown direction="end">
              <DropdownToggle color="primary" style={{ padding: 0 }}>
                <i onClick={handleIconClick} class="fa fa-ellipsis-v" aria-hidden="true"></i>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setShowEditTask(!showEditTask)}>Edit</DropdownItem>
                <DropdownItem disabled={props.status === 'completed'} onClick={() => setShowDeleteTask(!showDeleteTask)}>Delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Badge>
        </div>
        <Button color="primary" size="sm">{convertToBtnTextByStatus(props.status)}</Button>
      </div>
      <div className=" vertical-space-2" />
      {showEditTask && <AddEditTask {...props} />}
      {showDeleteTask && <DeleteTask {...props} />}
    </>
  );
};

export default TaskInfo;
