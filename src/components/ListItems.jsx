import React from 'react'

export default function ListItems(
  List,
  items,
  handleToggleItems,
  filteredList,
  activeItems,
  removeList , 
  children
) {
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                  >
                    <path
                      fill="#494C6B"
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

