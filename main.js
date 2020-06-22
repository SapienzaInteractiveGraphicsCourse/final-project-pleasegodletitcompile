import * as THREE from './threejs/build/three.module.js';
import {OBJLoader2} from './threejs/examples/jsm/loaders/OBJLoader2.js';
import {GLTFLoader} from './threejs/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from './threejs/examples/jsm/controls/OrbitControls.js';
import { Sky } from './threejs/examples/jsm/objects/Sky.js';
import { PointerLockControls } from './threejs/examples/jsm/controls/PointerLockControls.js';

var camera, scene, renderer;
var sky, sunSphere;

// Controls variables
var controls;
var raycaster;
var objects = [];

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();

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
		
	// camera, position it and point 
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.y = 1;
	camera.position.z = 100;
	camera.lookAt(0, 0, 0);	

	// Control camera
	controls = new PointerLockControls(camera, document.body);
	controls.isLocked = true;
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

	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
	/*
	// control camera
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 0, 0);
	controls.update();
	*/


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
		gltfLoader.load(url, function (gltf) {
			gltf.scene.scale.set( 0.1, 0.1, 0.1);
			gltf.scene.position.z = 0;
			gltf.scene.position.y = 12;		

			gltf.scene.traverse( function ( child ) {
				if ( child.isMesh ) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			
			scene.add(gltf.scene);
      objects.push(gltf.scene);
		});
	}

	// initSky();
	initLights();

	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );

	if ( controls.isLocked === true ) {

		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;

		var intersections = raycaster.intersectObjects( objects );

		var onObject = intersections.length > 0;

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

		if ( onObject === true ) {

		velocity.y = Math.max( 0, velocity.y );
		canJump = true;

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
	var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	hemiLight.position.set( 0, 100, 0 );
	scene.add( hemiLight );

	// directional light
	var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.position.set( 50, 100, 0);
	dirLight.castShadow = true;
	dirLight.shadow.mapSize.width = 1024;
	dirLight.shadow.mapSize.height = 1024;
	var d = 100;
	dirLight.shadow.camera.left = - d;
	dirLight.shadow.camera.right = d;
	dirLight.shadow.camera.top = d;
	dirLight.shadow.camera.bottom = - d;
	dirLight.shadow.camera.near = 10;
	dirLight.shadow.camera.far = 1000;
	scene.add( dirLight );
	var shadowCameraHelper = new THREE.CameraHelper(dirLight.shadow.camera);
	shadowCameraHelper.visible = true;

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

	var distance = 400000;

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