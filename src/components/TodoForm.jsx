function TodoForm({ items, handleChange, handleSubmit, }) {
  return (
    <div className="form-header">
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
    </div>
  );
}
export default TodoForm;
