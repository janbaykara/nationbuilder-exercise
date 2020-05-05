import { NowRequest, NowResponse } from '@now/node'
import { random, merge } from 'lodash';
import { PersonResponse, PeopleListResponse } from '../../types/nationbuilder';
import * as nb from '../../lib/nationbuilder'
import { someFirstName, somePerson } from '../../utils';

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'POST': return createPerson(req, res)
    case 'GET': return getPeople(req, res)
    case 'PUT': return updatePerson(req, res)
    case 'DELETE': return deletePerson(req, res)
    default: {
      res.statusCode = 400
      res.json({ error: "No such method" })
    }
  }
}

export const getPeople = async (req: NowRequest, res: NowResponse) => {
  const people: PeopleListResponse = {
    results: [
      somePerson(),
      somePerson(),
      somePerson()
    ]
  } // Dummy
  // const people = await nb.getPeople()
  res.json(people as PeopleListResponse)
}

export const createPerson = async (req: NowRequest, res: NowResponse) => {
  const { person } = JSON.parse(req.body)
  if (!person) return res.json({ error: 'No person data provided' })
  // const newPerson = await nb.createPerson({ person })
  res.json({ person } as PersonResponse)
}

export const updatePerson = async (req: NowRequest, res: NowResponse) => {
  const { id, person } = JSON.parse(req.body)
  if (!id || !person) return res.json({ error: 'No person data / ID provided' })
  const updatedPerson: PersonResponse = person // Dummy response
  // const updatedPerson = await nb.updatePerson({ id, person })
  res.json({ person: updatedPerson })
}

export const deletePerson = async (req: NowRequest, res: NowResponse) => {
  const { id } = JSON.parse(req.body)
  if (!id) return res.json({ error: 'No ID provided' })
  const success = true // Dummy response
  // const success = await nb.deletePerson({ id })
  res.json({ success })
}