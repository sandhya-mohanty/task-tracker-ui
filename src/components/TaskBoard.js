import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Navbar, NavbarBrand, NavbarText, Row } from "reactstrap";
import AddEditTask from "./AddEditTask";
import TaskInfo from "./TaskInfo";
import statuses from '../data/status.json';
import { convertToBtnTextByStatus } from "../utils/common-utility";

/*
  @author: Sandhyarani Mohanty
  @date: 28-Mar-2024
  This component is for displaying all tasks
*/
const TaskBoard = () => {

  const [showAddEditTask, setShowAddEditTask] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [taskboardData, setTaskboardData] = useState(JSON.parse(localStorage.getItem("taskData")));
  const [filterForm, setFilterForm] = useState({});
  const data = JSON.parse(localStorage.getItem("taskData")); // This will be used for filter & sorting

  const handleAddItemBtnClick = () => {
    setShowAddEditTask(!showAddEditTask);
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (Object.keys(filterForm).length > 0) {
      let filteredTask = data;
      Object.keys(filterForm).forEach((k1, i) => {
        Object.keys(filteredTask).forEach((k2, i) => {
          if(k1 ==="dateRange") {
              filteredTask[k2] = filteredTask[k2].filter((task) => moment(new Date(task.startDate)).isBetween(filterForm.dateRange[0], filterForm.dateRange[1]));
          } else {
            filteredTask[k2] = filteredTask[k2].filter((task) => task[k1].toLowerCase().indexOf(filterForm[k1].toLowerCase()) !== -1);
          }
        });
      });
      setTaskboardData(filteredTask);
    }
  }, [filterForm]);

 const handleDateRangeChange = (val) => {
  setDateRange(val);
  if(val[0] !== null && val[1] !== null) {
    setFilterForm({...filterForm,  dateRange: val});
  }
 }

 const handleSortChange = (val) => {
  let filteredTask = data;
  Object.keys(filteredTask).forEach((k, i) => {
    filteredTask[k] = filteredTask[k].sort((a, b) => a[val].localeCompare(b[val]));
  });
  setTaskboardData(filteredTask);
 }

  return (
    <>
      <Navbar>
        <NavbarBrand><h1>Task Board</h1> </NavbarBrand>
        <NavbarText><i className="icon fa fa-user" /></NavbarText>
      </Navbar>

      <div className="taskboard-border">
        <Row>
          <Col sm="1">
            <Label>Filter by:</Label>
          </Col>
          <Col sm="2">
            <Input onChange={ (e) => setFilterForm({...filterForm, assignee: e.target.value})} bsSize="sm" placeholder="Assignee Name" />
          </Col>

          <Col sm="1">
            <Input onChange={ (e) => setFilterForm({...filterForm, priority: e.target.value})} bsSize="sm" type="select">
              <option>Priority</option>
              <option value="0">P0</option>
              <option value="1">P1</option>
              <option value="2">P2</option>
            </Input>
          </Col>

          <Col sm="7">
            <ReactDatePicker
              placeholderText="DD/MM/YYYY - DD/MM/YYYY"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(val) => handleDateRangeChange(val)}
              isClearable={true}
            />
          </Col>

          <Col sm="1">
            <Button onClick={handleAddItemBtnClick} color="primary" size="sm">Add New Task</Button>
          </Col>
        </Row>

        <div className="vertical-space-1" />
        <Row>
          <Col sm="1">
            <Label>Sort by:</Label>
          </Col>
          <Col sm="1">
          <Input bsSize="sm" type="select" onChange={(e)=> handleSortChange(e.target.value)}>
              <option>-- Select --</option>
              <option value="priority">Priority</option>
              <option value="assignee">Assignee</option>
            </Input>
          </Col>
        </Row>

        <div className="vertical-space-3" />
        {localStorage.getItem("taskData") !== null && (
          <Row>
            {statuses.map((status, key) => {
              return <Col key={key}>
                <Card>
                  <CardHeader className={`${status === "pending" ? 'bg-secondary' : status === "inProgress" ? "bg-warning" : status === "completed" ? "bg-success" : status === "deployed" ? "bg-deep-violet" : "bg-brick"} text-white text-center`}>{convertToBtnTextByStatus(status)}</CardHeader>
                  <CardBody>
                    {taskboardData[status].map((task, key) => {
                        return (
                          <TaskInfo
                            id={key}
                            title={task.title}
                            priority={task.priority}
                            desc={task.desc}
                            assignee={task.assignee}
                            status={status}
                            team={task.team}
                            startDate={task.startDate}
                          />
                        );
                      })}
                  </CardBody>
                </Card>
              </Col>
            })}
          </Row>
        )}
      </div>
      {showAddEditTask && <AddEditTask refreshPage={() => handleRefreshPage()} />}
    </>
  );
};

export default TaskBoard;
