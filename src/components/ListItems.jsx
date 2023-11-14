// import { useState } from "react";
import { HiPencil, HiTrash, HiOutlineCheck } from "react-icons/hi";

const date = new Date();

const newDtae = date.toLocaleTimeString();
// const Date1 = newDtae.split(" ")[0].slice(0, -3);
const hourAndSecond = `${date.getHours()}: ${date.getMinutes()}   ${
  date.getHours() > 12 ? "PM" : "AM"
}`;

const fullDay = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;


export function ListItems({
  removeList,
  children,
  handleToggleItems,
  filteredList,
  activeItems,
  setEditingItem,
  handleEditList,
  editingItem,
  setList,
  selectedId,
  setSelectedId,
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
            <>
              <li className="listItems" key={i}>
                <div className="inputs" id={i}>
                  <input
                    type="checkbox"
                    onChange={() => handleToggleItems(list.id)}
                    checked={list.isChecked}
                  />

                  <span
                    className="icon-remove"
                    onClick={() => removeList(list.id)}
                    role="button"
                  >
                    <HiTrash size={20} />
                  </span>

                  {selectedId === list.id ? (
                    <>
                      <input
                        className="input-edit"
                        type="text"
                        value={editingItem}
                        onChange={(e) => setEditingItem(e.target.value)}
                      />
                      <span className="icon-edit" role="button">
                        <HiOutlineCheck
                          size={20}
                          onClick={() => handleEditList(list.id)}
                        />
                      </span>
                      {/* {editingItem} */}
                    </>
                  ) : (
                    <>
                      <p className={list.isChecked ? "checked" : ""}>
                        {list.items}
                      </p>
                      <span
                        role="button"
                        className="icon-edit"
                        onClick={() => {
                          setSelectedId(list.id);
                          setEditingItem(list.items);
                        }}
                      >
                        <HiPencil size={20} />
                      </span>
                    </>
                  )}
                </div>

                <div>
                  <span className="date-list">{hourAndSecond} - {fullDay}</span>
                </div>
              </li>
            </>
          ))
        )}
      </ul>

      {children}
    </>
  );
}
