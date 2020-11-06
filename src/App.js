import React from 'react';

import './App.css';
import GoogleMaps from './Components/GoogleMaps';
import MapPick from './Components/MapPicker';
function App() {
  return (
    <div className="App">
      <h1>StackFinity Google Map Project ! </h1>
      <div className="App-header">
        <div id="map">
          <MapPick />
        </div>
      </div>
    </div>
  );
}

export default App;
