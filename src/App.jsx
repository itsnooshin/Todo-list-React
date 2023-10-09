import { useState } from "react";

function App() {
  const [items, setItems] = useState("");
  const [List, setList] = useState([]);
  function handleChange(e) {
    setItems(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setList([...List, { items: items }]);

    setItems("");
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
        <ListItems List={List} items={items}>
          <Footer />
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
function ListItems({ children, List, items }) {
  return (
    < >
      <ul className="Lists">
        {/* <li className="listItems">
          <input type="checkbox" />
          {List}
        </li> */}
        {List.length === 0 ? (
          <li className="NotTodo"> Not to do yet </li>
        ) : (
          List.map((list, i) => (
            <li className="listItems" key={i}>
             <input type="checkbox" /> {list.items}
            </li>
          ))
        )}
      </ul>
      {children}
    </>
  );
}

function Footer() {
  return (
    <div className="footer">
      <span className="item-left">X item Left</span>
      <div className="button-filter">
        <button className="btn btn-footer active">All</button>
        <button className="btn btn-footer">Active</button>
        <button className="btn btn-footer">Completed</button>
      </div>
      <button className="btn  btn-clear">Clear Completed</button>
    </div>
  );
}

export default App;
