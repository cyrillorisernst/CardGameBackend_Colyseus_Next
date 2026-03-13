import { Room, Client, CloseCode } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState.js";

export class MyRoom extends Room {
  maxClients = 4;
  state = new MyRoomState();

  messages = {
    yourMessageType: (client: Client, message: any) => {
      /**
       * Handle "yourMessageType" message.
       */
      console.log(client.sessionId, "sent a message:", message);
    }
  }

  onCreate (options: any) {
    /**
     * Called when a new room is created.
     */
    const lobbyCode = Math.random().toString(36).substring(2, 6).toUpperCase();

    // 2. Store it in the State so Next.js can see it
    this.state.mySynchronizedProperty = lobbyCode;

    console.log(lobbyCode)
  }

  onJoin (client: Client, options: any) {
    /**
     * Called when a client joins the room.
     */
    const newPlayer = new Player();
    newPlayer.name = options.playerName || "Anonymous";
    this.state.mySynchronizedProperty = client.sessionId
    this.state.players.push(newPlayer);
    
    console.log(newPlayer.name, "joined with client-session id: ", client.sessionId);
  }

  onLeave (client: Client, code: CloseCode) {
    /**
     * Called when a client leaves the room.
     */
    console.log(client.sessionId, "left!", code);
  }

  onDispose() {
    /**
     * Called when the room is disposed.
     */
    console.log("room", this.roomId, "disposing...");
  }

}
