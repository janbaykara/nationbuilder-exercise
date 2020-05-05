import { NowRequest, NowResponse } from '@now/node'
import { random, merge } from 'lodash';
import { PersonResponse, ContactResponse } from '../../types/nationbuilder';
import * as nb from '../../lib/nationbuilder'

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'POST': return createContact(req, res)
    default: {
      res.statusCode = 400
      res.json({ error: "No such method" })
    }
  }
}

export const createContact = async (req: NowRequest, res: NowResponse) => {
  const { id, contact } = JSON.parse(req.body)
  if (!id || !contact) return res.json({ error: 'No person / contact report provided' })
  const newContact = merge(contact, { person_id: id, created_at: new Date() }) // Dummy response
  // const newContact = await nb.createContact({ id, person })
  res.json({ contact: newContact as ContactResponse })
}