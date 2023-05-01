import { useState } from 'react'
import './App.css'
import './reset.css'

function App() {

  function createTracker(){

  }

  // Position (All this because of how to page is setup without the search bar would be easier i use percent because it will be interactive)
  // leftmost = 5%, rightmost = 75% (75 - 5 = 70)
  // topmost = 10%, bottommost = 90% (90 - 10 = 80)
  // Calculation:
  // For example: anchor1 = 0m, anchor2 = 10m, tracker = 4m
  // 10 = 100%, therefore 4 = 40%
  // X position
  // 40% of 70 = 28
  // Y position
  // 40% of 80 = 32

  // console.log((0.1*100).toString() + "%")

  function calculateXPosition(anchorXPosition, trackerXPosition, tracker){
    let percent = trackerXPosition / anchorXPosition;
    let result = 70 * percent;
    let string = (result*100).toString() + "%"
    tracker.style.left = string;
    return string;
  }

  function calculateYPosition(anchorYPosition, trackerYPosition, tracker){
    let percent = trackerYPosition / anchorYPosition;
    let result = 80 * percent;
    let string = (result*100).toString() + "%"
    tracker.style.left = string;
    return string;
  }

  

  return (
    <>
      <div id="background">
        <div id="tracker-container">
          <div className='anchor' id="anchor1">A1</div>
          <div className='anchor' id="anchor2">A2</div>
          <div className='anchor' id="anchor3">A3</div>
          <div className='tracker' id="maxwell"></div>
          <div id="scale">
            <div id="verticle"></div>
            <div id="horizontal"></div>
          </div>
          {/* Test */}
        </div>
        <div id="information-container">
          <div id="search-bar"> search bar </div>
          <div id="pet-information">
            {/* will create javascript later */}


          </div>
        </div>
      </div>
    </>
  )
}

export default App
