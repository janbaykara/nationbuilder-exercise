import * as React from "react";
import PersonExercise from "../exercises/PersonExercise";
import ContactExercise from "../exercises/ContactExercise";

export default () => {
  return (
    <div>
      <h1>Nationbuilder dev demo</h1>
      <h3>By Common Knowledge</h3>
      <p>
        We design digital tools for grassroots activists that makes radical
        change possible.
      </p>
      <hr />
      <h2>Person exercise</h2>
      <PersonExercise />
      <hr />
      <h2>Webhooks + Contact exercise</h2>
      <ContactExercise />
    </div>
  );
};
