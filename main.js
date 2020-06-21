import * as THREE from './threejs/three.module.js';
//import {OBJLoader2} from './threejs/Loaders/OBJLoader2.js';

var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
    // camera
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

    // scene
	scene = new THREE.Scene();

    // cube
	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// light
	{
		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(0, 10, 0);
		light.target.position.set(-5, 0, 0);
		scene.add(light);
		scene.add(light.target);
	}

/*
	// model
	{
		const objLoader = new OBJLoader2();
		objLoader.load('resources/models/windmill/windmill.obj', (root) => {
		  scene.add(root);
		});
	}
*/

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}