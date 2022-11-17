import * as THREE from 'three';
import Experience from '../experience';
import HouseView from './cover/house-view';
import Particles from './cover/particles';
import Controls from './controls';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.theme = 'light';
    this.resources.on('ready', () => {
      this.displayPage();
      this.setCamera();
      this.setLight();
      this.particles = new Particles();
      this.houseView = new HouseView();
      this.controls = new Controls();
      this.sizes.on('switchdevice', device => this.switchDevice(device));
    });
  }

  displayPage() {
    document.querySelector('.loading-container').style.visibility = 'hidden';
    document.body.style.overflow = 'auto';
    document.querySelector('.experience').style.visibility = 'visible';
    document.querySelector('.navbar').style.visibility = 'visible';
    document.querySelector('main').style.visibility = 'visible';
  }

  setCamera() {
    this.camera.perspectiveCamera.position.z = 35;
  }

  setLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 1);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(0, 0, 100);
    this.scene.add(this.sunLight);
  }

  switchDevice(device) {
    if (this.houseView) {
      this.houseView.switchDevice(device);
    }
    if (this.particles) {
      this.particles.switchDevice(device);
    }
    if (this.controls) {
      this.controls.switchDevice(device);
    }
  }

  switchTheme(theme) {
    this.theme = theme;
    document.body.classList.toggle('dark-theme');
    if (this.houseView) {
      this.houseView.switchTheme(this.theme);
    }
    if (this.particles) {
      this.particles.switchTheme(this.theme);
    }
    if (this.controls) {
      this.controls.switchTheme(this.theme);
    }
  }

  resize() {
    if (this.houseView) {
      this.houseView.resize();
    }
    if (this.particles) {
      this.particles.resize();
    }
    if (this.controls) {
      this.controls.resize();
    }
  }

  update() {
    if (this.houseView) {
      this.houseView.update();
    }
    if (this.particles) {
      this.particles.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
