"use client";

import { useEffect, useState } from "react";
import { Client } from "@colyseus/sdk";
import { useRoom, useRoomState } from "@colyseus/react";

const client = new Client("ws://localhost:2567");

export default function Test() {
  const [testName, setTestName] = useState("");
  const [isReady, setIsReady] = useState(false);

  const { room, error, isConnecting } = useRoom(
    isReady ? () => client.joinOrCreate("my_room", { playerName: testName }) : null,
    [isReady]
  );

  const state = useRoomState(room);

  const handleConnect = () => {
    if (testName.trim() === "") {
      alert("Please enter a name first!");
      return;
    }
    setIsReady(true);
  };

  useEffect(()=>{console.log(state?.players ?? "test")},[state])


  if (!isReady || isConnecting) {
    return (
      <div className="p-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="border p-2 rounded"
          disabled={isConnecting}
        />
        <button
          onClick={handleConnect}
          className="bg-blue-600 text-white p-2 rounded"
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Test"}
        </button>
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Lobby: {state?.mySynchronizedProperty}</h1>
      <p>Welcome, {testName}!</p>
      <p>List of players:</p>
      {state?.players ? (
        state.players.map((player: any, index: number) => (
          <p key={index}>{player.name} {index}</p>
        ))
      ) : (
        <p>Loading player list...</p>
      )}
      <button
        onClick={() => room?.send("yourMessageType", "i sent you a message")}
        className="mt-4 bg-green-600 text-white p-2 rounded"
      >
        Play Card
      </button>
    </div>
  );
};