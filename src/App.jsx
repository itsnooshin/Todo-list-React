import { useState } from "react";

function App() {
  const [items , setItems] = useState([]);
   
  function handle(newItem){
   setItems([...items, newItem]);
  }
  return (
    <>
      <Main>
        <Header />
        <AddListInput add={items} handle={handle} />
        <ListItems add={items}>
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
function AddListInput({items ,handle}) {
 
  return (
    <form action="#" className="form">
      <div className="span-icon"></div>
      <input
        type="text"
        className="form__input"
        placeholder="Create a new todo…"
        value={items}
        onChange={() => handle(items)}
      />
    </form>
  );
}
function ListItems({ children , items }) {
  console.log(items);
  
  return (
    <>
      <ul className="Lists">
        {/* <li className="listItems">
          <input type="checkbox" />
        </li> */}
        {items}
      </ul>
      {children}
    </>
  );
}

function Footer() {
  return <div></div>;
}

export default App;

