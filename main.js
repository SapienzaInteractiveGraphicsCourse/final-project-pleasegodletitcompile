import * as THREE from './threejs/build/three.module.js';
import {OBJLoader2} from './threejs/examples/jsm/loaders/OBJLoader2.js';
import {OrbitControls} from './threejs/examples/jsm/controls/OrbitControls.js';

var camera, scene, renderer;
var geometry, material;

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
    
    // camera
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 15;
    camera.position.y = 1;
	camera.lookAt(0, 0, 0)	
	
	//control camera
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
    // groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
    mesh.position.y = - 1;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );
    
	// model
	{
		const objLoader = new OBJLoader2();
		objLoader.load('./threejs/Models/windmill_001.obj', (root) => {
		  scene.add(root);
		});
    }
    
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