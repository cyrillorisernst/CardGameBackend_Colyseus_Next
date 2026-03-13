import { MapSchema, Schema, type } from "@colyseus/schema";


export class Player extends Schema {
    @type("string") name: string;
}


export class MyRoomState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";
  
  @type({ array: Player }) players = new Array<Player>();

}
