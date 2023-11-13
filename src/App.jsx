import { useEffect, useState } from "react";

import Header from "./components/Header";
import AddListInput from "./components/AddListInput";
import Main from "./components/Main";
import Footer from "./components/Footer";
import useLocalstorage from "./useLocalstorage";
import { HiPencil, HiTrash } from "react-icons/hi";

function App() {
  const [activeItems, setActiveItems] = useState([]);
  const [filteredList, setFilteredList] = useState("all");
  const [items, setItems] = useState("");

  const [List, setList] = useLocalstorage([], "List");

  function handleChange(e) {
    setItems(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (items.trim() !== "") {
      const newItem = {
        items: items,
        id: Date.now(),
        isChecked: false,
      };
      setList([...List, newItem]);
      setActiveItems([...List, newItem]);
      setItems("");
    }
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

  const itemChecked = List.filter((item) => item.isChecked).length;
  const itemtotal = List.length;
  const totalCalcuate = itemtotal - itemChecked;

  function removeItemesCompleted() {
    setList(List.filter((item) => !item.isChecked));
  }

  function removeList(id) {
    setList(List.filter((item) => item.id !== id));
  }

  return (
    <>
      <Main>
        <Header />
        <AddListInput
          items={items}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <ListItems
          List={List}
          items={items}
          handleToggleItems={handleToggleItems}
          filteredList={filteredList}
          activeItems={activeItems}
          removeList={removeList}
        >
          <Footer
            remove={removeItemesCompleted}
            setFilter={setFilteredList}
            filteredList={filteredList}
            itemChecked={totalCalcuate}
          />
        </ListItems>
      </Main>
    </>
  );
}

function ListItems({
  removeList,
  children,
  handleToggleItems,
  filteredList,
  activeItems,
}) {
  return (
    <>
      <ul className="Lists">
        {activeItems.length === 0 ? (
          filteredList === "active" ? (
            <p className="NotTodo ">No active todo</p>
          ) : filteredList === "complete" ? (
            <p className="NotTodo ">No completed todo</p>
          ) : (
            <p className="NotTodo ">No todo yet </p>
          )
        ) : (
          activeItems.map((list, i) => (
            <li className="listItems" key={i}>
              <div className="inputs" id={i}>
                <input
                  type="checkbox"
                  onChange={() => handleToggleItems(list.id)}
                  checked={list.isChecked}
                />

                <p className={list.isChecked ? "checked" : ""}>{list.items}</p>
                <span
                  className="icon-remove"
                  onClick={() => removeList(list.id)}
                  role="button"
                >
                  <HiTrash size={20} />
                  <HiPencil size={20} />
                </span>
              </div>
            </li>
          ))
        )}
      </ul>

      {children}
    </>
  );
}
export default App;
