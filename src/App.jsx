import { useEffect, useState } from "react";

function App() {
  const [List, setList] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [filteredList, setFilteredList] = useState("all");
  const [items, setItems] = useState("");

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
        active: true,
      };
      setList([...List, newItem]);

      setActiveItems([...List, newItem]);

      setItems("");
    }
  }
  useEffect(() => {
    const filteredTasks = () => {
      if (filteredList === "active") {
        return List.filter((item) => !item.isChecked);
      } else if (filteredList === "complete") {
        return List.filter((item) => item.isChecked);
      } else {
        return List;
      }
    };

    setActiveItems(filteredTasks());
  }, [List, filteredList]);

  function handleToggleItems(id) {
    setList(
      List.map((item) =>
        item.id === id
          ? { ...item, isChecked: !item.isChecked, active: !item.active }
          : item
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
            itemChecked={totalCalcuate}
            remove={removeItemesCompleted}
            setFilter={setFilteredList}
          />
        </ListItems>
      </Main>
    </>
  );
}
function Main({ children }) {
  return (
    <div className="main-content">
      <div className="container">{children}</div>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>TODO</h1>
      <img src="src\assets\icon-sun.svg" alt="headder icon" role="button" />
    </header>
  );
}
function AddListInput({ items, handleChange, handleSubmit }) {
  return (
    <form action="#" className="form" onSubmit={handleSubmit}>
      <div className="span-icon"></div>
      <input
        type="text"
        className="form__input"
        placeholder="Create a new todo…"
        value={items}
        onChange={handleChange}
      />
    </form>
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
                <img
                  src="/src\assets\icon-cross.svg"
                  alt={list.id}
                  className="icon-remove"
                  role="button"
                  onClick={() => removeList(list.id)}
                />
              </div>
            </li>
          ))
        )}
      </ul>

      {children}
    </>
  );
}
function Footer({ itemChecked, remove, setFilter }) {
  return (
    <div className="footer">
      <span className="item-left">{itemChecked} item Left</span>
      <div className="button-filter">
        <button className="btn btn-footer" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="btn btn-footer" onClick={() => setFilter("active")}>
          Active{" "}
        </button>
        <button
          className="btn btn-footer"
          onClick={() => setFilter("complete")}
        >
          Compeleted
        </button>
      </div>
      <button className="btn btn-clear" onClick={remove}>
        Clear Completed
      </button>
    </div>
  );
}
export default App;
