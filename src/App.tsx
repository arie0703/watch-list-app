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
          <Item key={w.id} id={w.id} name={w.title} comment={w.comment || ""} likes={w.likes} />
          )
        })}
      </div>
      <Form />
    </>
  )
}

export default App
