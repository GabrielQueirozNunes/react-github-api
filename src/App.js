import React, { useState, useEffect }  from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', { 
      "title": `Novo Repositório ${Date.now()}`, 
       "url":  `http://github.com/GabrielQN/${Date.now()}`, 
       "techs": ["Node.js"]
      });
      const repository = response.data;

      setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    const newRepositoriesList = repositories;

    const repositoryIndex = newRepositoriesList.findIndex(repository => repository.id === id);

    newRepositoriesList.splice(repositoryIndex, 1);
    
    setRepositories([...newRepositoriesList]);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title} 
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button> 
        </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
