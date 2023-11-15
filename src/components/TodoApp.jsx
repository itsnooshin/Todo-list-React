import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import useLocalstorage from "../useLocalstorage";
import { TodoList } from "./TodoList";
import TodoForm from "./TodoForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoApp() {
  const [activeItems, setActiveItems] = useState([]);
  const [filteredList, setFilteredList] = useState("all");
  const [items, setItems] = useState("");
  const [List, setList] = useLocalstorage([], "List");
  const [editingItem, setEditingItem] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const notify = () => {
    toast.success("Task added succesfully ", {
      position: "top-center",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      limit: 1,

      style: {
        fontSize: "20px",
        padding: "20px",
      },
    });
    if (!items) return;
    const newItem = {
      items: items,
      id: Date.now(),
      isChecked: false,
    };
    setList([...List, newItem]);
    setActiveItems([...List, newItem]);
    setItems("");
  };

  function handleChange(e) {
    setItems(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!items) return;
    const newItem = {
      items: items,
      id: Date.now(),
      isChecked: false,
    };
    setList([...List, newItem]);
    setActiveItems([...List, newItem]);
    setItems("");

    notify();
  }
  useEffect(() => {
    const filteredTasks = () => {
      if (filteredList === "active") {
        return List.filter((item) => !item.isChecked); // not complete false
      } else if (filteredList === "complete") {
        return List.filter((item) => item.isChecked); // true
      } else {
        return List;
      }
    };
    setActiveItems(filteredTasks());
  }, [List, filteredList]);

  function handleToggleItems(id) {
    setList(
      List.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  }

  const notifyDelete = () => {
    toast.error("Item deleted successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        fontSize: "19px",
        padding: "20px",
      },
    });
  };
  const notifyUpdate = () => {
    toast.success("Task Updated succesfully ", {
      position: "top-center",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      limit: 1,

      style: {
        fontSize: "19px",
        padding: "20px",
      },
    });
  };

  const notifyValidTask = () => {
    toast.error("Please select a valid item", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        fontSize: "19px",
        padding: "20px",
      },
    });
  };

  const itemChecked = List.filter((item) => item.isChecked).length;
  const itemtotal = List.length;
  const totalCalcuate = itemtotal - itemChecked;

  function removeItemesCompleted() {
    setList(List.filter((item) => !item.isChecked));
  }

  function removeList(id) {
    setList(List.filter((item) => item.id !== id));

    notifyDelete();
  }

  function handleEditList(id) {
    if (editingItem.length > 0) {
      setList(
        List.map((item) =>
          item.id === id ? { ...item, items: editingItem } : item
        )
      );
      setSelectedId(null);
      setEditingItem("");
      notifyUpdate();
    } else {
      notifyValidTask();
    }
  }

  return (
    <>
      <Main>
        <Header />
        <TodoForm
          items={items}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          notify={notify}
        />
        <TodoList
          handleToggleItems={handleToggleItems}
          filteredList={filteredList}
          activeItems={activeItems}
          removeList={removeList}
          handleEditList={handleEditList}
          setEditingItem={setEditingItem}
          editingItem={editingItem}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        >
          <Footer
            itemChecked={totalCalcuate}
            setFilter={setFilteredList}
            filteredList={filteredList}
            remove={removeItemesCompleted}
          />
        </TodoList>
      </Main>

      <ToastContainer limit={1} />
    </>
  );
}

export default TodoApp;
