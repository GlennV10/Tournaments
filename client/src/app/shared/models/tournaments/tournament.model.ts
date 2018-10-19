export class Tournament {
   _id: string;
   pokerroom: string;
   name: string;
   buyin: number;
   prizePool: number;
   speed: string;
   tableSize: number;
   time: {
      hour: number;
      minute: number;
   };
   lateRegistration: {
      hour: number;
      minute: number;
   };
   days: [string];
   formats: [string];
   reEntries: number;
}