import * as THREE from './threejs/build/three.module.js';
import {OBJLoader2} from './threejs/examples/jsm/loaders/OBJLoader2.js';
import {GLTFLoader} from './threejs/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from './threejs/examples/jsm/controls/OrbitControls.js';
import { Sky } from './threejs/examples/jsm/objects/Sky.js';

var camera, scene, renderer;
var geometry, material;
var sky, sunSphere;

init();
animate();

function init() {
	// renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x0000ff );
    
    // camera
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 1000;
    camera.position.y = 1;
	camera.lookAt(0, 0, 0)	
	
	// control camera
	const controls = new OrbitControls(camera, renderer.domElement);
  	controls.target.set(0, 5, 0);
  	controls.update();
    
    // light
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
    
    // ground
    var loader = new THREE.TextureLoader();

    var groundTexture = loader.load( 'textures/ground.png' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 2000, 2000 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    var groundMaterial = new THREE.MeshPhongMaterial( { map: groundTexture, side: THREE.DoubleSide } );

    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );
    
	// models
    {    
      const gltfLoader = new GLTFLoader();
      const url = './threejs/Models/cartoon_lowpoly_small_city_free_pack/scene.gltf';
      gltfLoader.load(url, (gltf) => {
        const root = gltf.scene;
        root.position.z = -50;
        root.position.y = 150;
        scene.add(root);
      });
    }
    
    initSky();

    window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function initSky() {
  // sky
  sky = new Sky();
  sky.scale.setScalar( 450000 );
  scene.add( sky );

  // Add Sun Helper
  sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 20000, 16, 8 ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } )
  );
  sunSphere.position.y = - 700000;
  sunSphere.visible = false;
  scene.add( sunSphere );
}