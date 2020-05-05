import path from 'path'
import { PersonResponse, Person, Contact, ContactResponse, PeopleListResponse } from '../types/nationbuilder';
import { merge } from 'lodash';

/**
 * NB API helper functions
 */

export const getPeople = async ({ person }: { person: Person }) => {
  const res = await fetch(
    nbURL('/people'),
    {
      method: 'GET',
      headers,
    }
  )
  return await res.json() as PeopleListResponse
}

export const createPerson = async ({ person }: { person: Person }) => {
  const res = await fetch(
    nbURL('/people'),
    {
      method: 'POST',
      body: nbBody({ person }),
      headers,
    }
  )
  return await res.json() as PersonResponse
}

export const updatePerson = async ({ id, person }: { id: string, person: Person }) => {
  const res = await fetch(
    nbURL(`/people/${id}`),
    {
      method: 'PUT',
      body: nbBody({ person }),
      headers,
    }
  )
  return await res.json() as PersonResponse
}

export const deletePerson = async ({ id }: { id: string }) => {
  const res = await fetch(
    nbURL(`/people/${id}`),
    {
      method: 'DELETE',
      body: nbBody(),
      headers,
    }
  )
  if (res.status === 204) {
    return true
  } else {
    return false
  }
}

export const createContact = async ({ id, contact }: { id: string, contact: Contact }) => {
  const res = await fetch(
    nbURL(`/people/${id}/contacts`),
    {
      method: 'POST',
      body: nbBody({ contact }),
      headers,
    }
  )
  return await res.json() as ContactResponse
}

/**
 * NB API helper utilities
 */

const nationSlug = process.env.NATIONBUILDER_NATION_SLUG
const baseURL = `https://${nationSlug}.nationbuilder.com/api/v1`
const accessToken = process.env.NATIONBUILDER_ACCESS_TOKEN

const nbURL = (endpoint: string) => path.join(baseURL, endpoint)
const nbBody = (body: object = {}) => JSON.stringify(
  merge(body, {
    format: 'json',
    access_token: accessToken
  })
)

const headers = {
  "access_token": accessToken,
  'content-type': 'application/json',
  'Accept': 'application/json',
}