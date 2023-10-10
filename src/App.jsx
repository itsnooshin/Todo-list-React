import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState("");
  const [List, setList] = useState([]);
  const [activeRange, setActiveRange] = useState(0);
  const [filteredList, setFilteredList] = useState("all");
  const [activeItems, setActiveItems] = useState([]);

  const updateFilter = (newFilter) => {
    setFilteredList(newFilter);
  };
  function handleFilterChange(NewFilter) {
    if (NewFilter === "complete") {
      updateFilter(NewFilter);

      // setList(List.filter((item) => item.isChecked === true));
      console.log(List.filter((item) => item.isChecked === true));
       // useEffect(() =>{
  //   setActiveItems(List.filter((item) => !item.isChecked));
  // },[filteredList , List]);
    } else if (NewFilter === "active") {
      updateFilter(NewFilter);

      // setList(List.filter((item) => item.isChecked === false));
    } else {
      updateFilter(NewFilter);
    }
  }

  function handleChange(e) {
    setItems(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setList([
      ...List,
      {
        items: items,
        id: Date.now(),
        isChecked: false,
      },
    ]);
    setItems("");
  }

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

  // useEffect(() =>{
  //   setActiveItems(List.filter((item) => !item.isChecked));
  // },[filteredList , List]);

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
        >
          <Footer
            items={List}
            itemChecked={totalCalcuate}
            activeRange={activeRange}
            setActiveRange={setActiveRange}
            List={List}
            handleFilterChange={handleFilterChange}
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

function Footer({ itemChecked, handleFilterChange }) {
  return (
    <div className="footer">
      <span className="item-left">{itemChecked} item Left</span>
      <div className="button-filter">
        <button
          className="btn btn-footer"
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className="btn btn-footer"
          onClick={() => handleFilterChange("active")}
        >
          Active{" "}
        </button>
        <button
          className="btn btn-footer"
          onClick={() => handleFilterChange("complete")}
        >
          Compeleted
        </button>
      </div>
      <button className="btn btn-clear">Clear Completed</button>
    </div>
  );
}

function ListItems({ children, List, handleToggleItems }) {
  return (
    <>
      <ul className="Lists">
        {List.length === 0 ? (
          <p className="NotTodo"> Not to do yet </p>
        ) : (
          List.map((list, i) => (
            <li className="listItems" key={i}>
              <div className="inputs" id={i}>
                <input
                  type="checkbox"
                  onChange={() => handleToggleItems(list.id)}
                />
                <p className={list.isChecked ? "checked" : ""}>{list.items}</p>
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
