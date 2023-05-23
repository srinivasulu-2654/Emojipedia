import React, { useState, useEffect } from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";

function createEntry(emojiTerm) {
  return (
    <Entry
      key={emojiTerm.id}
      emoji={emojiTerm.character}
      name={emojiTerm.unicodeName}
      description={emojiTerm.group}
    />
  );
}

function App() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://emoji-api.com/emojis?access_key=ae7b2eb089dbeb5a3a676c9bd2fea93ae0f9b653"
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData =
    data &&
    data.filter((e) => {
      return (
        e.unicodeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.group.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    console.log(data);

  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <dl className="dictionary">
        {filteredData && filteredData.map(createEntry)}
      </dl>
    </div>
  );
}

export default App;
