

export default function Footer({itemChecked , setFilter , filteredList , remove}) {
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
         Clear Completed {" "}
      </button>
    </div>
  );
}
