// import { useState } from 'react'

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
function Header() {
  return (
    <div className="header">
      <div>
        <div className="header-title">
          <h1>TODO</h1>
          <img src="\src\assets\icon-sun.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
