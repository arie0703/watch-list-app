import "./App.scss";
import { Form } from "./components/form";
import { Entry } from "./components/entry";
import { useCookies } from "react-cookie";
import { retrieveSession } from "./libs/room";
import { useEffect, useState } from "react";
import { ExitButton } from "./components/exit-button";
import { WatchList } from "./components/watch-list";
import { FloatingButton } from "./components/floating-button";
import { NewRoom } from "./components/new-room";
import { Hint } from "./components/hint";

function App() {
  const [cookies] = useCookies();
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const sessionID = cookies["session_id"];
      if (sessionID && !currentRoom) {
        // Cookieに保存されたセッションIDから入室中の部屋UUIDをkvに問い合わせ
        const roomUUID: string | null = await retrieveSession(
          cookies["session_id"]
        );
        setCurrentRoom(roomUUID);
      }
    })();
  }, [cookies]);

  return (
    <>
      <h1 className="app-title">やりたいリスト</h1>

      {!currentRoom && (
        <>
          <Entry setCurrentRoom={setCurrentRoom} />
          <NewRoom setCurrentRoom={setCurrentRoom}/>
          <Hint />
        </>
      )}

      {currentRoom && (
        <>
          <WatchList roomUUID={currentRoom} />
          <div className="pc">
            <Form roomUUID={currentRoom} />
          </div>
          <ExitButton setCurrentRoom={setCurrentRoom} />
          <div className="mobile">
            <FloatingButton roomUUID={currentRoom} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
