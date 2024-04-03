import { useState } from "react";
import supabase from "../supabase";
import CATEGORIES from "../Raw_Data_CATEGORIES/CATEGORIES";

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setOpenForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function HandleSubmit(e) {
    // 1. Prevent from auto close the form browser
    e.preventDefault();
    console.log(text, source, category);

    // 2.Check if data is valid. If so, create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Create a new fact
      // const newFact = {
      //   id: Math.round(Math.random() * 100),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };
      // console.log(newFact);

      setIsUploading(true);
      // 3. Upload fact to supabase and receive the new fact object
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      if (!error) {
        // 4.Add the new fact to the UI: Add the new fact to state
        setFacts((facts) => [newFact[0], ...facts]);
      } else {
        alert("There was a problem adding new fact.");
      }

      // 5. Reset the input fields
      setText("");
      setSource("");
      setCategory("");

      // 6. Close the form
      setOpenForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={HandleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the World..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trust worthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        disabled={isUploading}
        name=""
        id=""
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Choose Category</option>

        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

export default NewFactForm;
