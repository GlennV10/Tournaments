export class Tournament {
   _id: String;
   pokerroom: String;
   name: String;
   buyin: {
      total: Number;
      regularPool: Number;
      bountyPool: Number;
      rake: Number;
   };
   prizePool: Number;
   speed: String;
   tableSize: Number;
   time: {
      hour: Number;
      minute: Number;
   };
   lateRegistration: {
      hour: Number;
      minute: Number;
   };
   days: [String];
   formats: [String];
   reEntries: Number;
}