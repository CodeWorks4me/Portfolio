import { useState, useEffect } from "react";

function App({id}) {
  const [value, setValue] = useState(0)

  return (
    <div className="App">
      <>
        <h2>Counter app</h2>
        <p>
          {value}
        </p>
        <div>
          <button className="btn" onClick={() => setValue(value + 1)}>Increase</button>
          <button className="btn" onClick={() => setValue(value - 1)} disabled = {value === 0}>Decrease</button>
          <button className="btn" onClick={() => setValue(0)}>Reset</button>
        </div>
      </>
    </div>
  );
}

export default App;
