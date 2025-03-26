import CoreConcept from "./CoreConcept";
import { CORE_CONCEPTS } from "../data";
import Section from "./Section";

export default function CoreConcepts() {
  return (
    <Section title="Time to get started!" id="core-concepts">
      <ul>
        {CORE_CONCEPTS.map((conceptsItem) => (
          <CoreConcept key={conceptsItem.title} {...conceptsItem} />
        ))}
      </ul>
    </Section>
  );
}
