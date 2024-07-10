import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Table } from './components/Table'
import { useWatchList } from './hooks/useWatchList'

function App() {
  const [item, setItem] = useState("")
  const [comment, setComment] = useState("")

  const {watchList, addWatchList} = useWatchList();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Watch List</h1>
      <div className="watch-list">
        <Table watchList={watchList || []} />
      </div>
      <div className="card">
        <p>
          欲しいものを入力してね!
        </p>

        <input
          className={"text-field"}
          value={item}
          onChange={(e) => setItem(e.target.value)}
        >
        </input>

        <input
          className="text-field"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        >
        </input>

        <button onClick={() => addWatchList(item, comment)}>
          Add Item
        </button>
      </div>
    </>
  )
}

export default App
