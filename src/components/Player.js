import React from 'react';
import ShakaPlayer from 'shaka-player-react';


const STREAMS = [
  {
    name: 'Angel One MPEG-DASH',
    src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8'
  },
  {
    name: 'Big Buck Bunny HLS',
    src:
      'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8'
  }
];

function Player() {
  const [show, setShow] = React.useState(false);
  const [chromeless, setChromeless] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    window.getShakaInst = () => ref.current;
  }, []);

  function onToggle() {
    setShow(!show);
  }

  function onChromeless() {
    setChromeless(!chromeless);
  }

  const [src, setSrc] = React.useState(STREAMS[0].src);

  function onSelectSrc(event) {
    setSrc(event.target.value);
  }
  console.log(src);
  return (
    // <div>
    //   <div>
    //     <button onClick={onToggle}>{show ? 'Hide' : 'Show'}</button>
    //   </div>
    //   <div>
    //     <input type="checkbox" onChange={onChromeless} /> Chromeless
    //   </div>
    //   <div>
    //     <select value={src} onChange={onSelectSrc}>
    //       {STREAMS.map((stream, index) => (
    //         <option key={index} value={stream.src}>{stream.name}</option>
    //       ))}
    //     </select>
    //   </div>
    //   {show && (
        // <ShakaPlayer className='w-50'  ref={ref} autoPlay src={'http://localhost:8000/api/video'} chromeless={chromeless} />
        <video controls autoPlay='true' src='http://localhost:8000/api/video'></video>
    //   )}
    // </div>
    // <ShakaPlayer autoPlay src="https://streams.com/example.mpd" />
    
  );
}



export default Player;