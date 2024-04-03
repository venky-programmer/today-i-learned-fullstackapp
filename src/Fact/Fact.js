import { useState } from "react";
import supabase from "../supabase";
import CATEGORIES from "../Raw_Data_CATEGORIES/CATEGORIES";

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(colName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [colName]: fact[colName] + 1 })
      .eq("id", fact.id)
      .select();

    setIsUpdating(false);

    if (!error) {
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    }
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[⛔️Disputed] </span> : null}
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
          className={isUpdating ? "updating" : ""}
        >
          👍<strong>{fact.votesInteresting}</strong>
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
          className={isUpdating ? "updating" : ""}
        >
          🤯 <strong>{fact.votesMindblowing}</strong>
        </button>
        <button
          onClick={() => handleVote("votesFalse")}
          disabled={isUpdating}
          className={isUpdating ? "updating" : ""}
        >
          ⛔️ <strong>{fact.votesFalse}</strong>
        </button>
      </div>
    </li>
  );
}

export default Fact;
