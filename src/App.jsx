import { useEffect, useState } from "react";

function App() {
  const [List, setList] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  // const [toggledarkmode, setToggledarkmode] = useState("dark");
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
            filteredList={filteredList}
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
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
        <path
          fill="#FFF"
          fill-rule="evenodd"
          d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
        />
      </svg>
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
                {/* <img
                  src="/src\assets\icon-cross.svg"
                  alt={list.id}
                  className="icon-remove"
                  role="button"
                  onClick={() => removeList(list.id)}
                /> */}
                <span
                  className="icon-remove"
                  onClick={() => removeList(list.id)}
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                  >
                    <path
                      fill="#494C6B"
                      fill-rule="evenodd"
                      d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                    />
                  </svg>
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
function Footer({ itemChecked, remove, setFilter, filteredList }) {
  return (
    <div className="footer">
      <span className="item-left">{itemChecked} item Left</span>
      <div className="button-filter">
        <button
          className={`btn btn-footer ${filteredList === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn btn-footer ${
            filteredList === "active" ? "active" : ""
          }`}
          onClick={() => setFilter("active")}
        >
          Active{" "}
        </button>
        <button
          className={`btn btn-footer ${
            filteredList === "complete" ? "active" : ""
          }`}
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
