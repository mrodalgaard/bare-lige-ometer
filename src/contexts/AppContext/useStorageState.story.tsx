import { z } from 'zod';
import { useStorageState } from './useStorageState';

export const StringStorageStateStory = () => {
  const [name, setName] = useStorageState('name', z.string(), 'John Doe');

  return (
    <>
      <h1 data-testid="header">{name}</h1>
      <button onClick={() => setName('Jane Doe')}>Change</button>
    </>
  );
};

export const ObjectStorageStateStory = () => {
  const [object, setObject] = useStorageState(
    'object',
    z.object({
      name: z.string().default('John Doe'),
      age: z.number().max(60).optional(),
      skills: z.array(z.string()),
    }),
    () => {
      return {
        name: 'Jane Doe',
        skills: ['skill1', 'skill2'],
      };
    }
  );

  return (
    <>
      <h1 data-testid="header">{JSON.stringify(object)}</h1>
      <button onClick={() => setObject((object) => ({ ...object, age: 30 }))}>Change</button>
    </>
  );
};

export const NumberStorageStateStory = () => {
  const [number, setNumber] = useStorageState('number', z.number(), 123);

  return (
    <>
      <h1 data-testid="header">{number}</h1>
      <button onClick={() => setNumber(321)}>Change</button>
    </>
  );
};
