export type RootStackParamList = {
  Home: {
    uid: string;
    userMail: string | null;
    userName: string | null;
    teamId: string | null;
    teamName: string | null;
    teamMembers:
      | {
          userName: string;
          mailAddress: string;
        }[]
      | null;
    teamMemberRefs: string[] | null;
  };
  NewEntry: { uid: string; userMail: string | null; userName: string };
  EntryDefaults: { choreId: string };
  Setup: undefined;
  Statistics: {
    uid: string;
    userMail: string | null;
    userName: string;
    teamId: string | null;
    teamName: string | null;
    teamMembers:
      | {
          userName: string;
          mailAddress: string;
        }[]
      | null;
    teamMemberRefs: string[] | null;
  };
  CreateNewTeam: { userMail: string | null };
  InviteToTeam: { userMail: string | null };
  EditChoreList: { userMail: string | null };
  Start: undefined;
  SignUp: undefined;
  SignIn: undefined;
  /*   Dashboard: {
    uid: string;
    userMail: string | null;
    userName: string;
    teamId: string | null;
    teamName: string | null;
    teamMemberRefs: string[] | null;
  }; */
  /* Settings: { uid: string; userMail: string | null; userName: string }; */
};

export type TabParamList = {
  Dashboard: {
    uid: string;
    userMail: string | null;
    userName: string;
    teamId: string | null;
    teamName: string | null;
    teamMembers:
      | {
          userName: string;
          mailAddress: string;
        }[]
      | null;
    teamMemberRefs: string[] | null;
  };
  Settings: { uid: string; userMail: string | null; userName: string };
  NewEntry: { uid: string; userMail: string | null; userName: string };
  Statistics: {
    uid: string;
    userMail: string | null;
    userName: string;
    teamId: string | null;
    teamName: string | null;
    teamMembers:
      | {
          userName: string;
          mailAddress: string;
        }[]
      | null;
    teamMemberRefs: string[] | null;
  };
};

export type ChoreLogParams = {
  choreId: string;
  choreWeight: number;
  choreName: string;
  choreDate: number;
  teamName: string;
  timestamp: number;
  userId: string;
  userName: string;
};

export type ChoreLogEntry = {
  [key: string]: ChoreLogParams;
};

export type TeamChoreLog = {
  [key: string]: ChoreLogEntry[];
};

export type TeamMemberDataSnapshot = {
  [key: string]: {
    mailAddress: string;
    userName: string;
  };
};

export type TeamMembers = {
  members: {
    [key: string]: {
      mailAddress: string;
    };
  }[];
};

export type TeamMembersArray = {
  mailAddress: string;
  userName: string;
}[]

export type TeamCreatorWrapper = {
  [key: string]: {
    teamName: string;
  };
};

export type LogEntryCreatorWrapper = {
  [key: string]: ChoreLogParams;
};

export type TeamEntry = {
  teamMember: string;
};

export type MemberLog = {
  userName: string;
  totalChoreCounts: number;
  totalChoreWeights: number;
};

export type Chore = {
  choreName: string;
  choreWeight: number;
};

export interface ChoreExtended extends Chore {
  choreId: string;
  isSelected?: boolean;
}

export type ChoreCreatorWrapper = {
  [key: string]: Chore;
};
