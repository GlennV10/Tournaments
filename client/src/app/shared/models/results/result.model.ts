import { Tournament } from "../tournaments/tournament.model";
import { User } from "../users/user.model";

export class Result {
   _id: String;
   tournament: Tournament;
   user: User;
   date: Date;
   payout: Number;
   bounties: Number;
   position: Number;
}