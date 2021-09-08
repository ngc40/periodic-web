import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { table } from '../config';
import '../assets/table.less';

export default () => {
  let camera, scene, renderer, controls, transformControls, raycaster, mouse;
  let targets = { simple: [], table: [], sphere: [], helix: [], grid: [] };

  function init() {
    initCamera();
    initScene();
    initObjects();
    initRenderer();
    initTrackbarControls();

    transform(targets.table, 1000);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousedown', onDocumentMouseDown, false);
    animate();
  }

  function onDocumentMouseDown(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera(mouse, camera);

    // 获取raycaster直线和所有模型相交的数组集合
    var intersects = raycaster.intersectObjects(scene.children);
  }

  function initCamera() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;
  }

  function initScene() {
    scene = new THREE.Scene();
  }

  function initRenderer() {
    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
  }

  function initObjects() {
    simpleObjectsLayout();
    generateGeometricLayouts();
  }

  function simpleObjectsLayout() {
    for (let i = 0; i < table.length; i += 5) {
      let object = new CSS3DObject(htmlElement(table, i));

      object.position.x = Math.random() * 4000 - 2000;
      object.position.y = Math.random() * 4000 - 2000;
      object.position.z = Math.random() * 4000 - 2000;

      scene.add(object);
      targets.simple.push(object);
      tableLayout(table, i);
    }
  }

  function htmlElement(table, i) {
    let element = document.createElement('div');
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0, 127, 127, 0.5 )';

    let number = document.createElement('div');
    number.className = 'number';
    number.textContent = i / 5 + 1;
    element.appendChild(number);

    let symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = table[i];
    element.appendChild(symbol);

    let details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
    element.appendChild(details);

    return element;
  }

  function elementClickHandler(i) {
    // transform(targets.table, 1000);
    console.log(targets.simple[i / 5].position);

    new TWEEN.Tween(targets.simple[i / 5].position)
      .to(
        {
          x: 0,
          y: 0,
          z: 2500,
        },
        Math.random() * 2000 + 2000,
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    // new TWEEN.Tween(this)
    //   .to({}, 2000 * 2)
    //   .onUpdate(render)
    //   .start();
  }

  function tableLayout(table, index) {
    let object = new THREE.Object3D();

    object.position.x = table[index + 3] * 140 - 1330;
    object.position.y = -(table[index + 4] * 180) + 990;
    targets.table.push(object);
  }

  function initTrackbarControls() {
    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 4;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.addEventListener('change', render);
  }

  function generateGeometricLayouts() {
    let sphereVector = new THREE.Vector3();
    let helixVector = new THREE.Vector3();

    for (let i = 0, l = targets.simple.length; i < l; i++) {
      addSphereObject(sphereVector, i, l);
      addHelixObject(helixVector, i);
      addGridObject(i);
    }
  }

  function addSphereObject(sphereVector, index, length) {
    const phi = Math.acos(-1 + (2 * index) / length);
    const theta = Math.sqrt(length * Math.PI) * phi;
    let object = new THREE.Object3D();

    object.position.setFromSphericalCoords(600, phi, theta);
    sphereVector.copy(object.position).multiplyScalar(2);
    object.lookAt(sphereVector);
    targets.sphere.push(object);
  }

  function addHelixObject(helixVector, index) {
    const theta = index * 0.175 + Math.PI;
    const y = -(index * 8) + 450;
    let object = new THREE.Object3D();

    object.position.setFromCylindricalCoords(900, theta, y);

    helixVector.x = object.position.x * 2;
    helixVector.y = object.position.y;
    helixVector.z = object.position.z * 2;

    object.lookAt(helixVector);

    targets.helix.push(object);
  }

  function addGridObject(index) {
    let object = new THREE.Object3D();
    object.position.x = (index % 5) * 400 - 800;
    object.position.y = -(Math.floor(index / 5) % 5) * 400 + 800;
    object.position.z = Math.floor(index / 25) * 1000 - 2000;
    targets.grid.push(object);
  }

  function transform(target, duration) {
    TWEEN.removeAll();

    for (let i = 0; i < targets.simple.length; i++) {
      let object = targets.simple[i];
      let targetObject = target[i];
      transformObjectPosition(object, targetObject, duration);
      transformObjectRotation(object, targetObject, duration);
    }

    new TWEEN.Tween()
      .to({}, duration * 2)
      .onUpdate(render)
      .start();
  }

  function transformObjectPosition(object, targetObject, duration) {
    new TWEEN.Tween(object.position)
      .to(
        {
          x: targetObject.position.x,
          y: targetObject.position.y,
          z: targetObject.position.z,
        },
        Math.random() * duration + duration,
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  }

  function transformObjectRotation(object, targetObject, duration) {
    new TWEEN.Tween(object.rotation)
      .to(
        {
          x: targetObject.rotation.x,
          y: targetObject.rotation.y,
          z: targetObject.rotation.z,
        },
        Math.random() * duration + duration,
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
  }

  return {
    init,
    mintAnimation() {
      transform(targets.sphere, 500);
    },
    initPosition() {
      transform(targets.table, 500);
    },
    removeHandler() {
      window.removeEventListener('resize', onWindowResize, false);
    },
  };
};
