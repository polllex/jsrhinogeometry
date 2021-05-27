// Import libraries
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/controls/OrbitControls.js'
import { Rhino3dmLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124.0/examples/jsm/loaders/3DMLoader.js'

// declare variables to store scene, camera, and renderer
let scene, camera, renderer
const model = 'rhino_logo.3dm'

// call functions
init()
animate()

// function to setup the scene, camera, renderer, and load 3d model
function init () {

    // Rhino models are z-up, so set this as the default
    THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );

    // create a scene and a camera
    scene = new THREE.Scene()
    scene.background = new THREE.Color(1,1,1)
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    camera.position.y = - 30

    // create the renderer and add it to the html
    renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    // add some controls to orbit the camera
    const controls = new OrbitControls( camera, renderer.domElement );

    // add a directional light
    const directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.intensity = 2;
    scene.add( directionalLight );

    // load the model
    const loader = new Rhino3dmLoader()
    loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.13.0/' )

    loader.load( model, function ( object ) {

        // uncomment to hide spinner when model loads
        document.getElementById('loader').remove()
        scene.add( object )

    } )
    function createJSFram() {
        const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
        const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const wheel = new THREE.Mesh(geometry, material);
        return wheel;
      }

      function createJSBackframe() {
        const jsframe = new THREE.Group();
        
        const backoftheFrame = createJSFram();
        backoftheFrame.position.y = 6;
        backoftheFrame.position.x = -18;
        jsframe.add(backoftheFrame);
        
        const frontoftheFrame = createJSFram();
        frontoftheFrame.position.y = 6;  
        frontoftheFrame.position.x = 18;
        jsframe.add(frontoftheFrame);
      
        const main = new THREE.Mesh(
          new THREE.BoxBufferGeometry(60, 15, 30),
          new THREE.MeshLambertMaterial({ color: 0x78b14b })
        );
        main.position.y = 12;
        jsframe.add(main);
      
        const cabin = new THREE.Mesh(
          new THREE.BoxBufferGeometry(33, 12, 24),
          new THREE.MeshLambertMaterial({ color: 0xffffff })
        );
        cabin.position.x = -6;
        cabin.position.y = 25.5;
        jsframe.add(cabin);
      
        return jsframe;
      }
      
      const jsframe = createJSBackframe();
      scene.add(jsframe);
      
      renderer.render(scene, camera);

      function getjsframeFrontTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 32;
        const context = canvas.getContext("2d");
      
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, 64, 32);
      
        context.fillStyle = "#666666";
        context.fillRect(8, 8, 48, 24);
      
        return new THREE.CanvasTexture(canvas);
      }
      function getjsframeSideTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 32;
        const context = canvas.getContext("2d");
      
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, 128, 32);
      
        context.fillStyle = "#666666";
        context.fillRect(10, 8, 38, 24);
        context.fillRect(58, 8, 60, 24);
      
        return new THREE.CanvasTexture(canvas);
      }
      function createJSBackframe() {
  const jsframe = new THREE.Group();

  const backoftheFrame = createJSFram();
  backoftheFrame.position.y = 6;
  backoftheFrame.position.x = -18;
  jsframe.add(backoftheFrame);

  const frontoftheFrame = createJSFram();
  frontoftheFrame.position.y = 6;
  frontoftheFrame.position.x = 18;
  jsframe.add(frontoftheFrame);

  const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0xa52523 })
  );
  main.position.y = 12;
  jsframe.add(main);

  const jsframeFrontTexture = getjsframeFrontTexture();

  const jsframeBackTexture = getjsframeFrontTexture();

  const jsframeRightSideTexture = getjsframeSideTexture();

  const jsframeLeftSideTexture = getjsframeSideTexture();
  jsframeLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
  jsframeLeftSideTexture.rotation = Math.PI;
  jsframeLeftSideTexture.flipY = false;


  return jsframe;
}
}

// function to continuously render the scene
function animate() {

    requestAnimationFrame( animate )
    renderer.render( scene, camera )

}



