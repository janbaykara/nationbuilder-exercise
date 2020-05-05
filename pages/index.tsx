import * as React from "react";
import PersonExercise from "../exercises/PersonExercise";
import ContactExercise from "../exercises/ContactExercise";
import { Page } from '../components/page';

export default () => {
  return (
    <Page>
      <header>
        <h1>Nationbuilder dev demo</h1>
        <h4>By Common Knowledge</h4>
        <p>
          We design digital tools for grassroots activists that makes radical
          change possible.
        </p>
      </header>

      <section style={{ margin: '80px 0px' }}>
        <h1>1. Person exercise</h1>
        <PersonExercise />
      </section>

      <section style={{ margin: '80px 0px' }}>
        <h1>2. Webhooks + Contact exercise</h1>
        <ContactExercise />
      </section>
    </Page>
  );
};
