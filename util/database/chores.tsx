import { getDatabase, ref, set } from 'firebase/database';

/* export type Chore = {
  choreId: string;
  choreName: string;
  choreWeight: number;
  isSelected?: boolean;
}; */

export const chores = [
  {
    choreId: '1',
    choreName: 'dummy',
    choreWeight: 0,
  },
  {
    choreId: '2',
    choreName: 'Vacuum cleaning',
    choreWeight: 5,
  },
  {
    choreId: '3',
    choreName: 'Cat toilet cleaning',
    choreWeight: 2,
  },
  {
    choreId: '4',
    choreName: 'Taking out the trash',
    choreWeight: 1,
  },
  {
    choreId: '5',
    choreName: 'Wiping dust',
    choreWeight: 6,
  },
  {
    choreId: '6',
    choreName: 'Cleaning the bathtub',
    choreWeight: 3,
  },
  {
    choreId: '7',
    choreName: 'Cleaning the toilet',
    choreWeight: 6,
  },
  {
    choreId: '8',
    choreName: 'Collecting dried laundry',
    choreWeight: 2,
  },
  {
    choreId: '9',
    choreName: 'Annoy Albert',
    choreWeight: 99,
  },
  {
    choreId: '10',
    choreName: 'Do nothing',
    choreWeight: 10,
  },
];

export function initFirebaseChores(teamId: string) {
  const db = getDatabase();
  const errors = []
  for (const chore of chores) {
    set(ref(db, `chores/${teamId}/` + chore.choreId), {
      choreName: chore.choreName,
      choreWeight: chore.choreWeight,
    })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        errors.push(error)
        return false;
      });
  }
  return !(errors.length > 0);
}
