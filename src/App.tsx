import './App.css'
import { Item } from './components/Item'
import { useWatchList } from './hooks/useWatchList'
import { Form } from './components/form'
import { Entry } from './components/entry';

function App() {

  const {watchList} = useWatchList();

  // 現在入室中の部屋情報
  const currentRoom = localStorage.getItem('currentRoom');

  return (
    <>
      <h1>Watch List</h1>

      {!currentRoom &&
        <Entry />
      }

      {currentRoom &&
        <>
          <div className="watch-list">
          {watchList && watchList.map((w) => {
            return (
              <Item key={w.id} id={w.id} name={w.title} comment={w.comment || ""} likes={w.likes} />
              )
            })}
          </div>
          <Form />
        </>
      }
    </>
  )
}

export default App
