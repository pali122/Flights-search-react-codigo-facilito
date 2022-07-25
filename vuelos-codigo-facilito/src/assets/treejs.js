import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const initializeThree = () => {
  // Base
  // ----------

  // Initialize scene
  const scene = new THREE.Scene();

  // Initialize camera

  let fov;

  if (
    window.innerHeight >= window.innerWidth &&
    Math.abs(window.innerHeight - window.innerWidth) > 1000
  ) {
    fov = (13 * window.innerHeight) / window.innerWidth;
  } else if (
    window.innerHeight < window.innerWidth &&
    Math.abs(window.innerHeight - window.innerWidth) > 1000
  ) {
    fov = (6 * window.innerWidth) / window.innerHeight;
  } else {
    fov = 15;
  }

  const camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    0.1,
    60
  );

  // Reposition camera
  camera.position.set(6, 0, 0);

  // Initialize renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  // Set renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Append renderer to body
  document.body.appendChild(renderer.domElement);

  // Initialize controls
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onResize, false); //When window is resized, call onResize() function.

  function onResize() {
    let SCREEN_WIDTH = window.innerWidth; //Re-declaring variables so they are updated based on current sizes.
    let SCREEN_HEIGHT = window.innerHeight;

    //   camera.aspect = window.innerHeight / window.innerWidth; //Camera aspect ratio.
    if (
      window.innerHeight >= window.innerWidth &&
      Math.abs(window.innerHeight - window.innerWidth) > 1000
    ) {
      camera.fov = (13 * SCREEN_HEIGHT) / SCREEN_WIDTH;
    } else if (
      window.innerHeight < window.innerWidth &&
      Math.abs(window.innerHeight - window.innerWidth) > 1000
    ) {
      camera.fov = (6 * SCREEN_WIDTH) / SCREEN_HEIGHT;
    } else {
      camera.fov = 15;
    }
    camera.updateProjectionMatrix(); //Updating the display
    console.log("render");
    // renderer.setSize(window.innerWidth, window.innerHeight); //Setting the renderer to the height and width of the window.
  }

  // World
  // ----------

  // Load world texture
  const worldTexture = new THREE.TextureLoader().load(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg"
  );
  const worldTexturebump = new THREE.TextureLoader().load(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg"
  );
  const worldTextureSpec = new THREE.TextureLoader().load(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthspec1k.jpg"
  );
  // Initialize world geometry
  const worldGeometry = new THREE.SphereGeometry(0.5, 40, 40);

  // Initialize world material
  const worldMaterial = new THREE.MeshToonMaterial({
    map: worldTexture,
    bumpMap: worldTexturebump,
    specularMap: worldTextureSpec,
  });

  // Initialize world
  const world = new THREE.Mesh(worldGeometry, worldMaterial);

  // Add earth to scene
  scene.add(world);

  // Clouds
  // ----------

  // Load clouds texture
  const cloudTexture = new THREE.TextureLoader().load(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg"
  );
  const cloudTextureAlpha = new THREE.TextureLoader().load(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg"
  );
  // Initialize clouds geometry
  const cloudGeometry = new THREE.SphereGeometry(0.51, 40, 40);

  // Initialize clouds material
  const cloudMaterial = new THREE.MeshToonMaterial({
    map: cloudTexture,
    alphaMap: cloudTextureAlpha,
    transparent: true,
  });

  // Initialize clouds
  const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
  let spotLight = new THREE.SpotLight(0xffffff, 1.5, 0, 10, 2);
  scene.add(spotLight);
  spotLight.position.set(0, 0, 0);
  // Add clouds to scene
  scene.add(clouds);

  // Animation
  // ----------

  // Prepare animation loop
  function animate() {
    // Request animation frame
    requestAnimationFrame(animate);

    // Rotate world
    world.rotation.y += 0.0005;

    // Rotate clouds
    clouds.rotation.y += 0.001;

    // Render scene
    renderer.render(scene, camera);
  }

  // Animate
  animate();

  // Resize
  // ----------

  // Listen for window resizing
  window.addEventListener("resize", () => {
    // Update camera aspect
    camera.aspect = window.innerWidth / window.innerHeight;

    // Update camera projection matrix
    camera.updateProjectionMatrix();

    // Resize renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Marker Proto
  let markerProto = {
    latLongToVector3: function latLongToVector3(
      latitude,
      longitude,
      radius,
      height
    ) {
      var phi = (latitude * Math.PI) / 180;
      var theta = ((longitude - 180) * Math.PI) / 180;

      var x = -(radius + height) * Math.cos(phi) * Math.cos(theta);
      var y = (radius + height) * Math.sin(phi);
      var z = (radius + height) * Math.cos(phi) * Math.sin(theta);

      return new THREE.Vector3(x, y, z);
    },
    marker: function marker(size, color, vector3Position) {
      let markerGeometry = new THREE.SphereGeometry(size);
      let markerMaterial = new THREE.MeshToonMaterial({
        color: color,
      });
      let markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
      markerMesh.position.copy(vector3Position);

      return markerMesh;
    },
  };

  // Place Marker
  let placeMarker = function (object, options) {
    let position = markerProto.latLongToVector3(
      options.latitude,
      options.longitude,
      options.radius,
      options.height
    );
    let marker = markerProto.marker(options.size, options.color, position);
    object.add(marker);
  };

  // Place Marker At Address
  let placeMarkerAtAddress = function (address, color) {
    let result = JSON.parse(address);

    if (result.length > 0) {
      console.log(result);
      let latitude = result[0];
      let longitude = result[1];

      placeMarker(world, {
        latitude: latitude,
        longitude: longitude,
        radius: 0.5,
        height: 0,
        size: 0.01,
        color: color,
      });
    }
  };
  //   placeMarkerAtAddress("[24.0589008331,123.805999756]", "red")

  return [world, placeMarkerAtAddress];
};

export default initializeThree;
