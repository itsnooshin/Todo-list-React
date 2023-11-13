

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

export default AddListInput;
