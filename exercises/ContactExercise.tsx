import React from "react";
import { useFetch } from 'react-async'
import { PersonResponse } from '../types/nationbuilder';
import { ResponseObject } from '../components/fetch';
import LogContactForm from '../components/LogContactForm';

export default () => {
  return (
    <div>
      <h3>1. Create a webhook that fires when a person is contacted ✅</h3>
      <pre>See Nationbuilder dev sandbox</pre>

      <h3>2. Make a form that logs a contacts</h3>
      <LogContactTask />
    </div>
  )
};

const LogContactTask: React.FC = () => {
  const query = useFetch<PersonResponse>(
    '/api/contact',
    { method: 'POST' },
    { defer: true, json: true }
  )

  const submitContact = (data) => {
    const { person_id, sender_id, note } = data
    query.run({ body: JSON.stringify({
      id: person_id,
      contact: {
        sender_id,
        note
      }
    }) })
  }

  return (
    <div>
      <div style={{ border: '2px solid grey', padding: 20 }}>
        <LogContactForm onSubmit={submitContact} />
      </div>
      <hr />
      <hr />
      <hr />
      <h3>3. When the form is submitted show the payload</h3>
      <ResponseObject title='POST /person/:id/contact' {...query.data} />
    </div>
  )
}