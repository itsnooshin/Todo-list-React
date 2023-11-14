import { useEffect, useState } from "react";

import Header from "./components/Header";
import AddListInput from "./components/AddListInput";
import Main from "./components/Main";
import Footer from "./components/Footer";
import useLocalstorage from "./useLocalstorage";
import { ListItems } from "./components/ListItems";
// import { HiArrowPath } from "react-icons/hi2";

function App() {
  const [activeItems, setActiveItems] = useState([]);
  const [filteredList, setFilteredList] = useState("all");
  const [items, setItems] = useState("");
  const [List, setList] = useLocalstorage([], "List");
  const [editingItem, setEditingItem] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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

  function handleEditList(id) {
    setList(
      List.map((item) =>
        item.id === id ? { ...item, items: editingItem } : item
      )
    );
    setSelectedId(null);
    setEditingItem("");
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
          setItems={setItems}
          setList={setList}
          // ListChange={handleEditListChange}
          handleEditList={handleEditList}
          setEditingItem={setEditingItem}
          editingItem={editingItem}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
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

export default App;
