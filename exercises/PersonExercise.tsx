import React, { FC, useEffect, useState } from "react";
import { useFetch } from 'react-async'
import { Person, PersonResponse } from '../types/nationbuilder';
import { merge, sample } from 'lodash'
import { ResponseObject } from '../components/fetch';
import { Button } from '../components/elements';
import { somePerson } from '../utils';

export default () => {
  const [person, setPerson] = useState<Person>()

  return (
    <div>
      <ResponseObject title='Person object' {...person} />

      <h3>1. Create a person</h3>
      <CreatePersonTask onCreate={p => setPerson(p)}  />

      <h3>2. Update a person</h3>
      <UpdatePersonTask person={person} onChange={p => setPerson(p)} />

      <h3>3. Delete a person</h3>
      <DeletePersonTask person={person} onChange={p => setPerson(p)} />
    </div>
  )
};

export const CreatePersonTask: FC<{
  onCreate: (p: Person) => void
}> = ({ onCreate }) => {
  const query = useFetch<PersonResponse>(
    '/api/person',
    { method: 'POST' },
    { defer: true, json: true }
  )

  const createPerson = () => {
    const person = somePerson()
    const args = {
      body: JSON.stringify({ person })
    }
    query.run(args)
  }

  useEffect(() => {
    if (!query.isInitial && query.isFulfilled && query.data?.person) {
      onCreate(query.data.person)
    }
  }, [query])

  return (
    <div>
      <Button onClick={createPerson}>Get person</Button>
      <ResponseObject title='CREATE /person' {...query.data} />
    </div>
  )
}

export const UpdatePersonTask: FC<{
  person?: Person
  onChange: (p: Person) => void
}> = ({ person, onChange }) => {
  const query = useFetch<PersonResponse>(
    '/api/person',
    { method: 'PUT' },
    { defer: true, json: true }
  )

  const changeGender = () => {
    if (!person) return
    const gender = sample(['M', 'F', 'O'] as Array<Person['gender']>)
    const updatedPerson = merge({} as Person, person, { gender })
    query.run()
    query.run({ body: JSON.stringify({
      id: updatedPerson.id,
      person: updatedPerson
    }) })
    onChange(updatedPerson)
  }

  return (
    <div>
      <Button disabled={!person} onClick={changeGender}>Change gender {person && `of ${person.first_name}`}</Button>
      <ResponseObject title='PUT /person/:id' {...query.data} />
    </div>
  )
}

export const DeletePersonTask: FC<{
  person?: Person
  onChange: (p?: Person) => void
}> = ({ person, onChange }) => {
  const query = useFetch<PersonResponse>(
    '/api/person',
    { method: 'DELETE' },
    { defer: true, json: true }
  )

  const deletePerson = () => {
    if (!person) return
    query.run()
    query.run({ body: JSON.stringify({ id: person.id }) })
    onChange()
  }

  return (
    <div>
      <Button disabled={!person} onClick={deletePerson}>Delete {person?.first_name}</Button>
      <ResponseObject title='DELETE /person/:id' {...query.data} />
    </div>
  )
}