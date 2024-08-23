import './App.css'
import { Item } from './components/Item'
import { useWatchList } from './hooks/useWatchList'
import { Form } from './components/form'
import { Entry } from './components/entry';
import { useCookies } from 'react-cookie';
import { retrieveSession } from './libs/room';
import { useEffect, useState } from 'react';

function App() {

  const {watchList} = useWatchList();
  const [cookies] = useCookies(); 
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  useEffect(() => {
    (async() => {
      // Cookieに保存されたセッションIDから入室中の部屋名をkvに問い合わせ
      const roomName: string | null = await retrieveSession(cookies["session_id"]);
      if (roomName) setCurrentRoom(roomName);
    })()
  }, []);

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
