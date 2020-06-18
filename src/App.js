import React, { useState } from "react";

import "./styles.css";
import api from "./services/api";
import { useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Umbriel ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript4"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      setRepositories(repositories.filter((r) => r.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
