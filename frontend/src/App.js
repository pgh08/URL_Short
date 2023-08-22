import './App.css';
import React from "react";
import UrlDataService from './servies/urlshort.js';
import { useState } from 'react';
import RenderArrayofOjects from './components/Textmodification.js';

function App() {
  const [url, setUrl] = useState({});
  const [shortURL, setShortURL] = useState(null);

  const onChangeUrlInput = (e) =>{
    const url = {
      original_url: e.target.value
    };
    setUrl(url);
  }

  const insertURL = () => {
    UrlDataService.createShortURL(url)
    .then(response => {
        console.log(response.data);
        let shortyURL = response.data.shortenedUrl;
        setShortURL(shortyURL);
    })
    .catch((e) => {
      console.log(`Unable to fetch shortened url: ${e}`);
    })
  }

  return (
    <div className="App">
      <h1 className="header">Shorty URL</h1>
      <div className="container-typer">
        <p className="typer">One step destination to shortening and converting url to QR-code</p>
      </div>
      <div className="input-block">
        <input type="text" className="url-input" placeholder="Enter the url" onChange={onChangeUrlInput}/>
        <button type="submit" className="button" onClick={insertURL}>Shorten URL</button>
      </div>
      {shortURL ? (
          <RenderArrayofOjects shortURL={shortURL}/>
      ): (
        <div className="container-short">
        </div>
      )}
    </div>
  );
}

export default App;
