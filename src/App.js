import { useEffect, useState } from "react";
import "./App.css";
import { Button, Container } from "react-bootstrap";
import { AddTaskForm } from "./components/AddTaskForm";
import { ListArea } from "./components/ListArea";
import { fetchTasks } from "./components/helper/axiosHelper";

const wklyHr = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);

  const [ids, setIds] = useState([]);

  useEffect(()=> {
    getTaskFromServer()
  }, [])

  const getTaskFromServer = async () => {
    const data = await fetchTasks()
    console.log(data)
    data.status === "success" && setTaskList(data.result)
  }

  const totat = taskList.reduce((acc, itme) => acc + +itme.hr, 0);

  const addTask = (task) => {
    if (totat + +task.hr > wklyHr) {
      return alert(
        "Sorry sir, you don't have enough time left to fit this task."
      );
    }
    setTaskList([...taskList, task]);
  };

  const switchTask = (id, type) => {
    console.log(id, type);

    const switchedArg = taskList.map((item, index) => {
      if (item.id === id) {
        item.type = type;
      }

      return item;
    });

    setTaskList(switchedArg);
  };

  const handleOnCheck = (e) => {
    const { checked, value, name } = e.target;
    console.log(checked, value, name);

    if (value === "entry" || value === "bad") {
      let toDeleteIds = [];
      taskList.forEach((item) => {
        if (item.type === value) {
          toDeleteIds.push(item.id);
        }
      });
      if (checked) {
        // add all entry list ids
        // console.log(taskList);

        setIds([...ids, ...toDeleteIds]);
      } else {
        // romve all entry list ids
        console.log("now remove the ids");
        const tempArgs = ids.filter((id) => !toDeleteIds.includes(id));
        setIds(tempArgs);
      }
      return;
    }

    console.log(value);
    if (checked) {
      // add individual item id
      setIds([...ids, value]);
    } else {
      // remove individual item id

      const filteredArg = ids.filter((id) => id !== value);
      setIds(filteredArg);
    }
  };

  const handleOnDelete = () => {
    if (
      !window.confirm("Are you sure you want to delete the selected items?")
    ) {
      return;
    }
    const tempArg = taskList.filter((item) => !ids.includes(item.id));
    setTaskList(tempArg);
    setIds([]);
  };

  return (
    <div className="wrapper">
      <Container>
        <h1 className="text-center py-5">My NotTo Do List</h1>
        {/* form comp */}
        <AddTaskForm addTask={addTask} />

        <hr />
        {/* list component */}
        <ListArea
          ids={ids}
          taskList={taskList}
          switchTask={switchTask}
          totat={totat}
          handleOnCheck={handleOnCheck}
        />
        <div className="mt-2">
          {ids.length > 0 && (
            <Button variant="danger" onClick={handleOnDelete}>
              Delete selected Tasks
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
