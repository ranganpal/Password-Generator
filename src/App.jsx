import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let _password = "";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=~`";

    for (let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length);
      _password += str.charAt(ind);
    }

    setPassword(_password);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md shadow-md rounded-lg px-4 py-3 my-16  mx-auto bg-gray-800 text-orange-500">
      < h1 className="text-3xl text-center m-5" >
        Password Generator
      </h1 >
      <div className="flex shadow rounded-lg overflow-hidden my-4">
        <input
          type="text"
          id="password"
          placeholder="password"
          className="outline-none w-full py-1 px-3"
          readOnly
          value={password}
          ref={passwordRef}
        />
        <button
          className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 duration-100 hover:bg-blue-800"
          onClick={copyPasswordToClipBoard}
        >copy</button>
      </div>
      <div className="flex justify-center my-3 gap-x-4">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            id="length"
            className="cursor-pointer"
            min={5}
            max={20}
            value={length}
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="number"
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed(prev => !prev);
            }}
          />
          <label htmlFor="number">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="character"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed(prev => !prev);
            }}
          />
          <label htmlFor="character">Character</label>
        </div>
      </div>
    </div >
  )
}

export default App
