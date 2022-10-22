import { User } from 'firebase/auth';

export type RootStackParamList = {
  Home: { uid: string; userMail: string | null };
  NewEntry: { uid: string; userMail: string | null };
  EntryDefaults: { choreId: string };
  Setup: undefined;
  Statistics: { uid: string; userMail: string | null };
  CreateNewTeam: { userMail: string | null };
  Settings: undefined;
  Start: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

export type UserEntry = {
  choreId: string;
  choreWeight: number;
  choreName: string;
  choreDate: string;
  teamName: string;
};

export type UserEntries = UserEntry[];

export type TeamEntry = {
  teamMember: string;
};
