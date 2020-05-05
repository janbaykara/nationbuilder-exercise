import { useForm, Controller } from "react-hook-form";
import { useFetch } from "react-async";
import { useState } from "react";
import { Person, PeopleListResponse } from '../types/nationbuilder';
import { ResponseObject } from './fetch';
import { Button } from './elements';

const LogContactForm: React.FC<{
  onSubmit: (data?: any) => void
}> = ({ onSubmit }) => {
  const people = useFetch<PeopleListResponse>('/api/person', { method: "GET" }, { json: true })
  const { register, handleSubmit, errors} = useForm();
  const [sender, setSender] = useState<Person>()
  const [person, setPerson] = useState<Person>()

  const onAttemptSubmit = (data) => {
    return onSubmit(data)
  }

  return (
    <div>
      <div>
        <h5>Pick the doorknocker and people</h5>
        {people.data?.results?.map(p => {
          const isSender = p.id === sender?.id
          const isReceiver = p.id === person?.id
          return (
          <div key={p.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'space-between' }}>
            <div>
              <div><b style={{ marginRight: 10 }}>{p.full_name}</b></div>
              <div style={{ opacity: 0.5 }}>{isReceiver ? "Contacted person" : isSender ? "Doorknocker" : null}</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
            <Button disabled={p.id === sender?.id} onClick={() => setSender(p)}>Pick doorknocker</Button>
            <Button style={{ marginLeft: 4 }} disabled={p.id === person?.id} onClick={() => setPerson(p)}>Pick contact</Button>
            </div>
          </div>
        )
          })}
        <Button onClick={people.reload}>Reload people</Button>
      </div>
      <hr />
      <form
        onSubmit={handleSubmit(onAttemptSubmit)}
      >
        <div>
          <label style={{ margin: '20px 0', fontWeight: 'bold', display: 'block', width: '100%' }} htmlFor='note'>Contact report</label>
          <textarea
            style={{ display: 'block', width: '100%', boxSizing: 'border-box', padding: 10 }}
            id='note' name='note' ref={register({ required: true })} minLength={3} maxLength={3000}></textarea>
        </div>

        <input type='hidden' name='sender_id' value={sender?.id} ref={register({ required: true })} />
        <input type='hidden' name='person_id' value={person?.id} ref={register({ required: true })} />

        {Object.keys(errors).length > 0 && (
          <pre>
            <b>Incorrect contact report</b>
            {JSON.stringify(Object.keys(errors), null, 2)}
          </pre>
        )}
        <Button type='submit'>Log this contact</Button>
      </form>
    </div>
  )
}

export default LogContactForm