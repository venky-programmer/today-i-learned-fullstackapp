import { useState, useEffect } from "react";
import Header from "./Header/Header";
import supabase from "./supabase";
import NewFactForm from "./NewFactForm/NewFactForm";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import FactList from "./FactList/FactList";
import "./styles.css";

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all") {
          query = query.eq("category", currentCategory);
        }

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) {
          setFacts(facts);
        } else {
          alert("There was problem rendering the data.");
        }
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  ); // Empty square brackets meanings dependency array

  return (
    <>
      <Header openForm={openForm} setOpenForm={setOpenForm} />

      {/* HEADER END */}
      {openForm ? (
        <NewFactForm setFacts={setFacts} setOpenForm={setOpenForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

// function Loader() {
//   return <p className="message">Loading...</p>;
// }

const Loader = () => {
  return <p className="message">Loading...</p>;
};

export default App;
