import { sample, random } from 'lodash';
import { Person } from './types/nationbuilder';

export const someFirstName = () => sample(['Rosa', 'Karl', 'Ursula'])

export const someLastName = () => sample(['Luxembourg', 'Marx', 'Le Guin'])

export const somePerson = (id = true) => {
  const first_name = someFirstName()
  const last_name = someLastName()
  const newPerson: Person = {
    first_name,
    last_name,
    full_name: `${first_name} ${last_name}`,
    email: `${first_name.toLowerCase()}@example.com`,
    id: random(1, 999999)
  }
  return newPerson
}