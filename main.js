window.onload = function(){
  // Cool title animation
    new TypeIt("#typeme", {
        strings: "Contact Tracing by Hacky Stack",
        speed: 75,
        loop: true
      }).go();

  // Setup sigma window
  sigma.parsers.json('data.json', {
    container: 'container',
        settings: {
            scalingMode: "inside",
            sideMargin: 0,
            autoResize: false,
            autoRescale: true,
            defaultNodeColor: '#ec5148'
        }
    });
}