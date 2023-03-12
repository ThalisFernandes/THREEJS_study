import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { randFloatSpread } from 'three/src/math/MathUtils';


const SCENE =  new THREE.Scene();

/**
 * PerspectiveCamera parametros 
 * 1° field of view: o campo de visualização em graus para a camera;
 * 2° aspect ratio : ou seja a proporcao da tela  
 */
const CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const RENDER  = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
})

/**
 * na linha abaixo escolho o tipo de geometria que irei utilizar dentro da lib e passo alguns parametros para a a geometria escolhida
 *  
 */
let  GEOMETRI  = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const MATERIAL = new THREE.MeshStandardMaterial( {color: 0xffff00});
const TORUSKNOT = new THREE.Mesh(GEOMETRI, MATERIAL);
const CONTROLS = new OrbitControls(CAMERA, RENDER.domElement);

const TEXTURA_PEDRA = new THREE.TextureLoader().load('texturapedra.jpg');

const SPACEBG = new THREE.TextureLoader().load('spaceBackground.jpg');
SCENE.background = SPACEBG;
const LIGHTPOINT = new THREE.PointLight(0xfffff);
LIGHTPOINT.position.set(100,100,100);
RENDER.setPixelRatio(window.devicePixelRatio);
RENDER.setSize(window.innerWidth, window.innerHeight);
// SCENE.add(TORUSKNOT);
CAMERA.position.setZ(30);
SCENE.add(LIGHTPOINT);
function animation(){
    requestAnimationFrame(animation);

    CONTROLS.update();
    TORUSKNOT.rotation.x += 0.01;
    TORUSKNOT.rotation.y += 0.01;
    TORUSKNOT.rotation.z += 0.01;
    
    RENDER.render(SCENE, CAMERA);
    
}

var textura_chao = new THREE.TextureLoader().load('texturapedra.jpg');

const GROUND = new THREE.Mesh(
    new THREE.PlaneGeometry(60,60,9,9),
    new THREE.MeshStandardMaterial({map: textura_chao})
)

SCENE.add(GROUND)

// const MOON = new THREE.Mesh(
//     new THREE.SphereGeometry(32, 25, 25),
//     new THREE.MeshStandardMaterial({map: TEXTURA_PEDRA })

// )

// SCENE.add(MOON)

// function addStar(){
//     const STARGEOMETRY = new THREE.SphereGeometry(0.25,10,10);
//     const MATERIALSTAR = new THREE.MeshStandardMaterial({color: 0xFBFBFB});
//     const STAR = new THREE.Mesh(STARGEOMETRY, MATERIALSTAR);
//     const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(250));

//     STAR.position.set(x,y,z);
//     SCENE.add(STAR);

// }

// Array(1000).fill().forEach(addStar);

animation();