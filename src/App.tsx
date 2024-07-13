import './App.css'
import { Item } from './components/Item'
import { useWatchList } from './hooks/useWatchList'
import { Form } from './components/form'

function App() {

  const {watchList} = useWatchList();

  return (
    <>
      <h1>Watch List</h1>
      <div className="watch-list">
      {watchList && watchList.map((w) => {
        return (
          <Item name={w.name.S || ""} comment={w.comment.S || ""} />
          )
        })}
      </div>
      <Form />
    </>
  )
}

export default App
