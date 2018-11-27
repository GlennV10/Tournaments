import { Tournament } from '../tournaments/tournament.model';

export class User {
   _id: String;
   firstname: String;
   lastname: String;
   email: String;
   password: String;
   schedule: [Tournament];
}