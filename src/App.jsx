import { useState, useEffect , useRef} from 'react'
import './App.css'
import './reset.css'
import {socket} from './socket/socket'

function App() {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      let container = document.getElementById("container");
      if (container) {
        clearInterval(interval);
        containerRef.current = container;
        setIsReady(true);
      }
    }, 1000);

    return () => {
      setIsReady(false);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Use Blender to check the name and path
    const container = containerRef.current;
    const anchorX = 5;
    const anchorY = 5;

    createTracker(container, 'maxwell');
    

    let tracker = document.getElementById('maxwell');
    
    if(socket){

      socket.onmessage = (data) => {
        const json = JSON.parse(data.data);

        console.log(json)
        
        calculateXPosition(anchorX, json, tracker)
        calculateYPosition(anchorY, json, tracker)
      }
    };

    return () => {
      socket.close();
    };
  }, [isReady]);

  function createTracker(container, trackerId){
    container.innerHTML= "<div class='tracker' id='"+ trackerId +"'></div>";
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
    // let percent = trackerXPosition.x / anchorXPosition;
    let percent = Math.abs(trackerXPosition.rot_x) / anchorXPosition;
    let result = (70 * percent) + 5;
    let string = (result).toString() + "%"
    console.log(string)
    tracker.style.left = string;
    return string;
  }

  function calculateYPosition(anchorYPosition, trackerYPosition, tracker){
    // let percent = trackerYPosition.y / anchorYPosition;
    let percent = Math.abs(trackerYPosition.rot_y) / anchorYPosition;
    let result = (80 * percent) + 10;
    let string = (result).toString() + "%"
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
          <div id='container'>

          </div>
          
          {/* <div className='tracker' id='test'></div> */}
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
