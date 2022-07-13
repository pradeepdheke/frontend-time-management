import { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { v4 as uuidv4 } from "uuid";

const inintialState = {
  task: "",
  hr: 0,
  type: "entry",
};
export const AddTaskForm = ({ addTask }) => {
  const [form, setForm] = useState(inintialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();
    addTask({ ...form, id: uuidv4() });
  };

  return (
    <Form onSubmit={handleOnsubmit}>
      <Row className="g-2">
        <Col md="7">
          <Form.Control
            name="task"
            placeholder="Task Name"
            required
            onChange={handleOnChange}
          />
        </Col>
        <Col md="3">
          <Form.Control
            name="hr"
            placeholder="10"
            type="number"
            required
            onChange={handleOnChange}
          />
        </Col>
        <Col md="2">
          <Button variant="success" type="submit">
            Add Task
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
