import * as THREE from './threejs/build/three.module.js';
import {OBJLoader2} from './threejs/examples/jsm/loaders/OBJLoader2.js';
import {GLTFLoader} from './threejs/examples/jsm/loaders/GLTFLoader.js';
//import {OrbitControls} from './threejs/examples/jsm/controls/OrbitControls.js';
import { Sky } from './threejs/examples/jsm/objects/Sky.js';
import { PointerLockControls } from './threejs/examples/jsm/controls/PointerLockControls.js';
//import { GUI } from './threejs/examples/jsm/libs/dat.gui.module.js';

var camera, scene, renderer;

// Mill
var mill;

// Lights
var hemiLight, dirLight;

// Sky
var sky, sunSphere;
const distance = 400000;

// Controls variables
var controls;
var raycasterXplus, raycasterYplus, raycasterZplus, raycasterXminus, raycasterYminus, raycasterZminus;
var objects = [];

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var vector = new THREE.Vector3();

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();

//Only needed for the debugging cubes 
var color = new THREE.Color();


init();
animate();


function init() {
	// renderer
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	document.body.appendChild( renderer.domElement );
		
	// scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xbfd1e5 );
	scene.fog = new THREE.FogExp2( 0xDCDBDF, 0.002 );
		
	// camera, position it and point forward
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.x = 0;
	camera.position.y = 10;
	camera.position.z = 0;
  	camera.lookAt(0, 10, -1);	
  

	raycasterXplus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(), 0.5, 5 );
	raycasterYplus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(0, 1, 0), 0.5, 5 );
	raycasterZplus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(), 0.5, 5 );
	raycasterXminus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(), 0.5, 5 );
	raycasterYminus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(0, -1, 0), 0.5, 5 );
	raycasterZminus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(), 0.5, 5 );
	raycasterXplus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(), 0.1, 7 );
	raycasterYplus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(0, 1, 0), 0.1, 7 );
	raycasterZplus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(), 0.1, 7 );
	raycasterXminus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(), 0.1, 7 );
	raycasterYminus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(0, -1, 0), 0.1, 7 );
	raycasterZminus = new THREE.Raycaster( new THREE.Vector3(),  new THREE.Vector3(), 0.1, 7 );

	// Control camera
	controls = new PointerLockControls(camera, document.body);

	// HTML instructions + click region to play
	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );
	
	instructions.addEventListener( 'click', function () {

		controls.lock();

	}, false );

	controls.addEventListener( 'lock', function () {

		instructions.style.display = 'none';
		blocker.style.display = 'none';

	} );

	controls.addEventListener( 'unlock', function () {

		blocker.style.display = 'block';
		instructions.style.display = '';

	} );

	// Define the controls
	scene.add( controls.getObject() );
	var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

		case 38: // up
		case 87: // w
			moveForward = true;
			break;

		case 37: // left
		case 65: // a
			moveLeft = true;
			break;

		case 40: // down
		case 83: // s
			moveBackward = true;
			break;

		case 39: // right
		case 68: // d
			moveRight = true;
			break;

		case 32: // space
			if ( canJump === true ) velocity.y += 350;
			canJump = false;
			break;

		}

	};

	var onKeyUp = function ( event ) {

		switch ( event.keyCode ) {

		case 38: // up
		case 87: // w
			moveForward = false;
			break;

		case 37: // left
		case 65: // a
			moveLeft = false;
			break;

		case 40: // down
		case 83: // s
			moveBackward = false;
			break;

		case 39: // right
		case 68: // d
			moveRight = false;
			break;

		}

	};

	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

	
	// Ground
	var loader = new THREE.TextureLoader();

	var groundTexture = loader.load( 'textures/ground.png' );
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 2000, 2000 );
	groundTexture.anisotropy = 16;
	groundTexture.encoding = THREE.sRGBEncoding;

	var groundMaterial = new THREE.MeshPhongMaterial( { map: groundTexture } );

	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );

	// Models
	{
	const gltfLoader = new GLTFLoader();
	// const url = './threejs/Models/low-poly-scenery-hills-and-lake.gltf';
	const url = './threejs/Models/windmill.gltf';
	gltfLoader.load(url, (gltf) => {
		const root = gltf.scene;
		root.scale.set( 10, 10, 10);
		root.position.z = -60;
		root.position.y = 4;
		// Traverse function, define a mesh for each node 
		root.traverse( function ( node ) {
			if ( node instanceof THREE.Mesh ) {
				node.castShadow = true;
				node.receiveShadow = true;
				objects.push(node);
			}
		});
		scene.add(root);
		mill = root.getObjectByName('lopatky');
		console.log(dumpObject(root).join('\n'));
		});
	
	}

	//torre di vedetta
	{
	const gltfLoaderTorre = new GLTFLoader();
	const urlTorre = './threejs/Models/vedetta.gltf';
	gltfLoaderTorre.load(urlTorre, (gltf) => {
		const rootTorre = gltf.scene;
		rootTorre.scale.set( 5, 5, 5);
		rootTorre.position.z = -20;
		rootTorre.position.y = 0;
		rootTorre.position.x = -50;

		// Traverse function, define a mesh for each node 
		rootTorre.traverse( function ( child ) {
				
			if ( node instanceof THREE.Mesh ) {
				node.castShadow = true;
				node.receiveShadow = true;
				objects.push(node);
			}
				
		});
		scene.add(rootTorre);
	});	
	}

	// Boxes
	var boxGeometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
	boxGeometry = boxGeometry.toNonIndexed(); // ensure each face has unique vertices

	var position = boxGeometry.attributes.position;
	var colors = [];

	for ( var i = 0, l = position.count; i < l; i ++ ) {

		color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		colors.push( color.r, color.g, color.b );

	}

	boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

	for ( var i = 0; i < 10; i ++ ) {

    var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true, side: THREE.DoubleSide } );
    boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

    var box = new THREE.Mesh( boxGeometry, boxMaterial );
    box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
    box.position.y = 10;
    box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

    scene.add( box );
    objects.push( box );

  }

	initSky();
	initLights();
	
	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );

	if ( controls.isLocked === true ) {
		mill.rotation.x += 0.01;

		camera.getWorldDirection( vector );

		// Set origin of the ray at the camera position
		// Set direction w.r.t. the world coordinates
		raycasterXplus.ray.origin.copy( controls.getObject().position );
		// TODO (LEOOOOOO PROVA FINCHE FINISCO DI MANGIARE): ROTATE BY THE RIGHT ANGLE
		// QUESTO RUOTA RISPETTO AL WOLRD REFERENCE FRAME
		raycasterXplus.ray.direction.copy( -vector)

		raycasterYplus.ray.origin.copy( controls.getObject().position );
		
		raycasterZplus.ray.origin.copy( controls.getObject().position );
		raycasterZplus.ray.direction.copy( -vector )

		raycasterXminus.ray.origin.copy( controls.getObject().position );
		raycasterXminus.ray.direction.copy( vector )

		raycasterYminus.ray.origin.copy( controls.getObject().position );
		raycasterYminus.ray.origin.y -= 10;

		raycasterZminus.ray.origin.copy( controls.getObject().position );
		raycasterZminus.ray.direction.copy( vector )

		// Check intesections with the list of objects
		var intersectionsXplus = raycasterXplus.intersectObjects( objects );
		var intersectionsYplus = raycasterYplus.intersectObjects( objects );
		var intersectionsZplus = raycasterZplus.intersectObjects( objects );
		var intersectionsXminus = raycasterXminus.intersectObjects( objects );
		var intersectionsYminus = raycasterYminus.intersectObjects( objects );
		var intersectionsZminus = raycasterZminus.intersectObjects( objects );

		// Check if the eventual closest intersection is less than threshold
		var onObjectXplus = intersectionsXplus.length > 0;
		var onObjectYplus = intersectionsYplus.length > 0;
		var onObjectZplus = intersectionsZplus.length > 0;
		var onObjectXminus = intersectionsXminus.length > 0;
		var onObjectYminus = intersectionsYminus.length > 0;
		var onObjectZminus = intersectionsZminus.length > 0;

		//console.log("onObjectXplus " + onObjectXplus);
		//console.log("onObjectYplus " + onObjectYplus);
		//console.log("onObjectZplus " + onObjectZplus);
		//console.log("onObjectXminus " + onObjectXminus);
		//console.log("onObjectYminus " + onObjectYminus);
		//console.log("onObjectZminus " + onObjectZminus);

		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
		
		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

		if ( onObjectXplus == true ) {
			velocity.x = 0;
			moveRight = false;
		}

		if ( onObjectXminus == true ) {
			velocity.x = 0;
			moveLeft = false;
		}
	

		if ( onObjectYplus == true ) {
			velocity.y = 0;
			canJump = false;  
		}

		if ( onObjectYminus == true ) {
			velocity.y = 0;
			canJump = true;  
		}

		if ( onObjectZplus == true ) {
			velocity.z = 0;
			moveBackward = false;
		}

		if ( onObjectZminus == true ) {
			velocity.z = 0;
			moveForward = false;
		}		

		controls.moveRight( - velocity.x * delta );
		controls.moveForward( - velocity.z * delta );

		controls.getObject().position.y += ( velocity.y * delta ); // new behavior

		if ( controls.getObject().position.y < 10 ) {
			velocity.y = 0;
			controls.getObject().position.y = 10;
			canJump = true;
		}

		prevTime = time;
	}


	renderer.render( scene, camera );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function initLights() {
	// hemisphere light 
	hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.4 );
	hemiLight.position.set( 0, 100, 0 );
	scene.add( hemiLight );

	// directional light
	dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.position.set( sunSphere.position.x, sunSphere.position.y, sunSphere.position.z);
	dirLight.castShadow = true;
	dirLight.shadow.mapSize.set( 1024, 1024 );
	const d = 500;
	dirLight.shadow.camera.left = - d;
	dirLight.shadow.camera.right = d;
	dirLight.shadow.camera.top = d;
	dirLight.shadow.camera.bottom = - d;
	dirLight.shadow.camera.near = distance - 500;
	dirLight.shadow.camera.far = distance + 500;
	scene.add( dirLight );

	// shadow camera helper
	const shadowCameraHelper = new THREE.CameraHelper(dirLight.shadow.camera);
	shadowCameraHelper.visible = true;
	scene.add( shadowCameraHelper );
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
	sunSphere.visible = false;
	scene.add( sunSphere );

	// Controls of the sun position and effect
	var effectController = {
		turbidity: 10,
		rayleigh: 2,
		mieCoefficient: 0.005,
		mieDirectionalG: 0.8,
		luminance: 1,
		inclination: 0.3, // elevation / inclination
		azimuth: 0.25, // Facing front,
		sun: ! true
	};

	var uniforms = sky.material.uniforms;
	uniforms[ "turbidity" ].value = effectController.turbidity;
	uniforms[ "rayleigh" ].value = effectController.rayleigh;
	uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
	uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;
	uniforms[ "luminance" ].value = effectController.luminance;

	var theta = Math.PI * ( effectController.inclination - 0.5 );
	var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

	sunSphere.position.x = distance * Math.cos( phi );
	sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
	sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

	sunSphere.visible = effectController.sun;

	uniforms[ "sunPosition" ].value.copy( sunSphere.position );
}

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}