import React from "react";
import { Col, Row } from "react-bootstrap";
import { TaskList } from "./TaskList";

export const ListArea = ({
  taskList,
  switchTask,
  totat,
  handleOnCheck,
  ids,
}) => {
  const entryList = taskList.filter(({ type }) => type === "entry");

  const badList = taskList.filter(({ type }) => type === "bad");

  const badHrs = badList.reduce((acc, item) => acc + +item.hr, 0);

  return (
    <div className="list-area">
      <Row>
        <Col>
          <TaskList
            title="Entry List"
            name="entry"
            arrow="right"
            list={entryList}
            switchTask={switchTask}
            handleOnCheck={handleOnCheck}
            ids={ids}
          />
        </Col>
        <Col>
          <TaskList
            title="Bad Task List"
            name="bad"
            switchTask={switchTask}
            list={badList}
            handleOnCheck={handleOnCheck}
            ids={ids}
          />

          <div className="text-end text-danger fw-bold">
            You could have saved {badHrs}hr
          </div>
        </Col>
      </Row>
      <div className="fw-bold">Total time allocated is {totat} hr/wk</div>
    </div>
  );
};
