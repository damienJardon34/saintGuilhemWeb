const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let canvas = document.getElementById('renderCanvas');
canvas.setAttribute("touch-action", "none");
canvas.setAttribute("long-press", "none");
canvas.onselectstart = function () { return false; }

// load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {}, true);
var scene;
var camera;
var deviceOrientedCam = null;
var VRCamera = null;

function vecToLocal(vector, mesh) {
    var m = mesh.getWorldMatrix();
    var v = BABYLON.Vector3.TransformCoordinates(vector, m);
    return v;
}

// createScene function that creates and return the scene
function createScene() {
    scene = new BABYLON.Scene(engine);

    camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    camera.invertRotation = true;
    camera.inverseRotationSpeed = 0.4;
    camera.minZ = 0.05;
    camera.speed = 0.3;

    if (!isMobile) { // add depthField
        let pipeline = new BABYLON.DefaultRenderingPipeline("defaultPipeline", true, scene, [camera]);
        pipeline.depthOfFieldEnabled = true;
        pipeline.depthOfFieldBlurLevel = 1.0;
        scene.registerBeforeRender(function () {
            let origin = camera.position;
            let forward = vecToLocal(new BABYLON.Vector3(0, 0, 1), camera);
            let direction = forward.subtract(origin);
            let ray = new BABYLON.Ray(origin, direction, 1000);
            let hit = scene.pickWithRay(ray);
            if (hit.pickedMesh) {
                pipeline.depthOfField.focusDistance = hit.distance * 1000; // focusDistance is in mm
            }
        });
    }

    // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("sky/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    //setup progress
    const setLoadingProgress = function (progress) {
        var loadingProgressDiv = window.document.getElementById("loadingProgress");
        loadingProgress.style.width = (progress * 100) + "%";
    }
    setLoadingProgress(0.0);
    const totalLoadingSteps = modelPaths.length;

    //select quality version
    var meshVersion = "high.glb";
    if (isMobile) { meshVersion = "medium.glb"; };

    const nextLoadingStep = function () {
        setLoadingProgress((totalLoadingSteps - modelPaths.length) / totalLoadingSteps);
        if (modelPaths.length > 0) {
            let modelPath = modelPaths.shift();
            BABYLON.SceneLoader.ImportMeshAsync("", modelPath, meshVersion, scene).then((result) => {
                var model = result.meshes[1];
                model.subdivide(40);
                model.createOrUpdateSubmeshesOctree();
                scene.createOrUpdateSelectionOctree();
                nextLoadingStep();
            });
        }
        else {
            let loadingScreenDiv = window.document.getElementById("loadingScreen");
            loadingScreenDiv.style.display = "none";
            goToZoneOfInterest(zoneOfInterets[defaultLocationIndex]);
        }
    }
    nextLoadingStep();
    return scene;
}

function createHtmlGUI() {
    // Get the modal
    var zoiModal = document.getElementById("zoiModal");
    // Get the button that opens the modal
    var zoiBtn = document.getElementById("zoiToggleButton");
    // When the user clicks on the button, open the modal 
    zoiBtn.onclick = function () {
        // whereAmI();
        zoiModal.style.display = "block";
    }
    function whereAmI() { //helper
        var origin = camera.position;
        var forward = new BABYLON.Vector3(0, 0, 10);
        forward = vecToLocal(forward, camera);
        console.log(origin.x + " , " + origin.y + " , " + origin.z + "  -  " + forward.x + " , " + forward.y + " , " + forward.z);
    };

    const zoiModalContent = document.getElementById("zoiModal-content");
    // When the user clicks anywhere outside of the modal, close it
    const zoiModalCloseBtn = document.getElementById("zoiModal-close");
    zoiModalCloseBtn.addEventListener('click', () => {
        zoiModal.style.display = "none";
    });

    for (const zoi of zoneOfInterets) {
        const newZoiButton = document.createElement('button');
        newZoiButton.textContent = zoi.name;
        newZoiButton.classList = ["zoiButton"];
        newZoiButton.style.fontSize = "1em";
        newZoiButton.style.fontWeight = "bold";
        zoiModalContent.appendChild(newZoiButton);
        newZoiButton.addEventListener('click', () => {
            zoiModal.style.display = "none";
            goToZoneOfInterest(zoi);
        });

        const subZOIs = zoi.subZOI;
        if (subZOIs != null) {
            for (const subZoi of subZOIs) {
                const newZoiButton = document.createElement('button');
                newZoiButton.textContent = subZoi.name;
                newZoiButton.style.paddingLeft = "2em";
                newZoiButton.classList = ["zoiButton"];
                newZoiButton.style.fontSize = "1em";
                zoiModalContent.appendChild(newZoiButton);
                newZoiButton.addEventListener('click', () => {
                    zoiModal.style.display = "none";
                    goToZoneOfInterest(subZoi);
                });
            }
        }

        const newSeparator = document.createElement('span');
        newSeparator.classList = ["separator"];
        zoiModalContent.appendChild(newSeparator);
    };

    var cvBtn = document.getElementById("infoToggleButton");
    var cvModal = document.getElementById("CVModal");
    cvBtn.onclick = function () {
        cvModal.style.display = "block";
    }
    var cvCloseBtn = document.getElementById('CV-close');
    cvCloseBtn.addEventListener('click', () => {
        cvModal.style.display = "none";
    });

    const infoModal = document.getElementById("infoModal");

    window.onclick = function (event) {
        if (event.target == zoiModal) {
            zoiModal.style.display = "none";
        }
        else if (event.target == cvModal) {
            cvModal.style.display = "none";
        }
        else if (event.target == infoModal) {
            infoModal.style.display = "none";
        }
    }
}

function createInfoButtons() {
    const infoModal = document.getElementById("infoModal");
    const infoClose = document.getElementById("info-close");
    const infoTitle = document.getElementById("info-Title");
    const infoText = document.getElementById("info-Text");
    const infoImg = document.getElementById("info-Img");

    infoClose.addEventListener('click', () => {
        infoModal.style.display = "none";
    });

    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");

    for (const infoCaption of infoCaptions) {
        const button = BABYLON.GUI.Button.CreateSimpleButton("btn", "i");
        button.fontFamily = "garamond";
        advancedTexture.addControl(button);
        var buttonSize = "40px";
        if (isMobile) {
            buttonSize = "80px";
            button.fontSize = 30;
        }
        button.width = buttonSize;
        button.height = buttonSize;
        button.cornerRadius = 100;
        button.color = "white";
        button.thickness = 2;
        button.background = "#2441D6";
        const node = new BABYLON.TransformNode("ref", scene);
        node.position = new BABYLON.Vector3(infoCaption.position.x, infoCaption.position.y, infoCaption.position.z);
        button.linkWithMesh(node);
        button.isVisible = false;

        infoCaption.button = button;


        button.onPointerClickObservable.add(() => {
            infoTitle.innerText = infoCaption.title;
            infoText.innerHTML = infoCaption.infos;
            infoImg.src = infoCaption.img;
            infoModal.style.display = "block";

            let frameRate = 60.0;
            let frameDuration = 2.0 * frameRate;
            let ease = new BABYLON.CubicEase();
            ease.setEasingMode(2);
            let animationPosition = BABYLON.Animation.CreateAnimation("position",
                BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                frameRate,
                ease
            );
            animationPosition.setKeys([
                {
                    frame: 0,
                    value: scene.activeCamera.position,
                },
                {
                    frame: frameDuration,
                    value: new BABYLON.Vector3(infoCaption.camPosition.x, infoCaption.camPosition.y, infoCaption.camPosition.z),
                },
            ]);
            let animationTarget = BABYLON.Animation.CreateAnimation("target",
                BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                frameRate,
                ease
            );
            var lookAt = new BABYLON.Vector3(0, 0, 10);
            lookAt = vecToLocal(lookAt, scene.activeCamera);
            animationTarget.setKeys([
                {
                    frame: 0,
                    value: lookAt,
                },
                {
                    frame: frameDuration,
                    value: node.position,
                },
            ]);
            scene.activeCamera.animations = [animationPosition, animationTarget];
            scene.beginAnimation(scene.activeCamera, 0, frameDuration, false, 2);
        });
    }

    for (const zone of zones) {
        zone.infos = [];
        for (const infoId of zone.infoIds) {
            for (const infoCaption of infoCaptions) {
                if (infoCaption.id == infoId) {
                    zone.infos.push(infoCaption);
                }
            }
        }
    }
}

var VRMove;
var toggleCam;
function createNavigation() {
    var clickTimer = 0;
    var startPosition = {};
    var doubleClick = false;
    var VRMoving = false;

    let viewButton = document.getElementById('vrToggleButton');
    if (!isMobile) {
        viewButton.style.display = "none";
    }
    function isVREnabled() {
        return (scene.activeCamera === VRCamera || scene.activeCamera === deviceOrientedCam);
    }
    toggleCam = function () {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    toggleVRCam();
                })
                .catch(console.error);
        }
        else {
            toggleVRCam();
        }

        function toggleVRCam() {
            if (!VRCamera) {
                VRCamera = new BABYLON.VRDeviceOrientationFreeCamera("", new BABYLON.Vector3(0, 0, 0), scene);
                VRCamera.minZ = 0.1;

                deviceOrientedCam = new BABYLON.DeviceOrientationCamera("", new BABYLON.Vector3(0, 0, 0), scene);
                deviceOrientedCam.minZ = 0.1;
            }
            VRMoving = false;
            if (scene.activeCamera === camera) {
                deviceOrientedCam.position = camera.position;
                scene.activeCamera = deviceOrientedCam;
                deviceOrientedCam.attachControl(canvas, true);
                camera.detachControl();
                VRCamera.detachControl();
                viewButton.textContent = "Mode 2";
            }
            else if (scene.activeCamera === deviceOrientedCam) {
                VRCamera.position = deviceOrientedCam.position;
                scene.activeCamera = VRCamera;
                VRCamera.attachControl(canvas, true);
                camera.detachControl();
                deviceOrientedCam.detachControl();
                viewButton.textContent = "Mode 3";
            }
            else {
                camera.position = VRCamera.position;
                scene.activeCamera = camera;
                camera.attachControl(canvas, true);
                VRCamera.detachControl();
                deviceOrientedCam.detachControl();
                viewButton.textContent = "Mode 1";
            }
        }
    };

    scene.onPointerDown = function (event, pickResult) {
        if (event.button == 0) {
            if (isVREnabled()) {
                VRMoving = true;
            }
            else {

                let now = Date.now();
                if (now - clickTimer < 400) {
                    doubleClick = true;
                }
                else {
                    doubleClick = false;
                };
                clickTimer = now;
                startPosition = { "x": event.x, "y": event.y };
            }
        };
    };
    scene.onPointerMove = function (event, pickInfo) {
        let threshold = 2;
        if (Math.abs(event.x - startPosition.x) > threshold || Math.abs(event.y - startPosition.y) > threshold) {
            clickTimer = 0;
        }
    };
    scene.onPointerUp = function (event, pickResult) {
        if (event.button == 0) {
            if (isVREnabled()) {
                VRMoving = false;
            }
            else {
                if ((Date.now() - clickTimer) < 200) {
                    let vector = pickResult.pickedPoint;
                    let targetPoint = vector.subtract(scene.activeCamera.position);

                    var distance = 3.0; //move 3m on a simple tap
                    if (doubleClick) {
                        distance = targetPoint.length();
                    }

                    let capedDistance = targetPoint.length() - (1.0);
                    distance = Math.min(distance, capedDistance);

                    let moveDirection = targetPoint.normalize().scale(distance);
                    var finalPosition = scene.activeCamera.position.add(moveDirection);

                    var toBottom = new BABYLON.Vector3(0, -1, 0);
                    var ray = new BABYLON.Ray(finalPosition, toBottom, 20);
                    var hit = scene.pickWithRay(ray);
                    if (hit.pickedMesh) {
                        if (hit.distance < 1.30) {
                            finalPosition.y = finalPosition.y - hit.distance + 1.30;
                        } else if (hit.distance > 1.9) {
                            finalPosition.y = finalPosition.y - hit.distance + 1.9;
                        }
                    }
                    moveCamera(finalPosition);
                };
            }
        };
    };
    let moveCamera = function (finalPosition) {
        let distance = finalPosition.subtract(scene.activeCamera.position).length();
        let frameRate = 60.0;
        let frameDuration = Math.max(distance * 10, 150);
        let ease = new BABYLON.CubicEase();
        ease.setEasingMode(2);
        let animation = BABYLON.Animation.CreateAnimation("position",
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            frameRate,
            ease
        );
        animation.setKeys([
            {
                frame: 0,
                value: scene.activeCamera.position,
            },
            {
                frame: frameDuration,
                value: finalPosition,
            },
        ]);
        scene.activeCamera.animations = [animation];
        scene.beginAnimation(scene.activeCamera, 0, frameDuration, false, 2);
    }
    VRMove = function () {
        if (VRMoving) {
            let stepLength = 3.0 / engine.getFps();
            var forward = new BABYLON.Vector3(0, 0, stepLength);
            let camForward = vecToLocal(forward, scene.activeCamera).subtract(scene.activeCamera.position);
            var newPosition = camForward.add(scene.activeCamera.position);
            let forwardRay = new BABYLON.Ray(scene.activeCamera.position, camForward, 100);
            let forwardHit = scene.pickWithRay(forwardRay);
            if (forwardHit.pickedMesh) {
                if (forwardHit.distance < 0.5) {
                    newPosition = scene.activeCamera.position; // to close from a wall
                }
            }
            let toBottom = new BABYLON.Vector3(0, -1, 0);
            let ray = new BABYLON.Ray(newPosition, toBottom, 20);
            let hit = scene.pickWithRay(ray);
            if (hit.pickedMesh) {
                if (hit.distance < 1.30) {
                    newPosition.y = newPosition.y - hit.distance + 1.30;
                } else if (hit.distance > 1.9) {
                    newPosition.y = newPosition.y - hit.distance + 1.9;
                }
            }
            scene.activeCamera.position = newPosition;
        }
    }
}

scene = createScene();
createGUI();
createHtmlGUI();
createInfoButtons();

var currentZone = null;
function checkCurrentInfoZone() { //make visible the infoButtons of the current zone
    var newZone = null;
    if (scene.activeCamera != VRCamera) {// no info in VR
        for (const zone of zones) {
            if (insidePoly(zone.poly, scene.activeCamera.position.x, scene.activeCamera.position.z)) {
                newZone = zone;
            }
        }
    }
    if (newZone != currentZone) {
        if (currentZone != null) {
            for (const info of currentZone.infos) {
                info.button.isVisible = false;
            };
        };
        if (newZone != null) {
            for (const info of newZone.infos) {
                info.button.isVisible = true;
            };
        };
        currentZone = newZone;
    }
    function insidePoly(poly, pointx, pointy) {
        var i, j;
        var inside = false;
        for (i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            if (((poly[i].y > pointy) != (poly[j].y > pointy)) && (pointx < (poly[j].x - poly[i].x) * (pointy - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)) inside = !inside;
        }
        return inside;
    }
}

function goToZoneOfInterest(zonePosition) {
    if (scene.activeCamera === camera) {
        let frameRate = 60.0;
        let frameDuration = zonePosition.duration * frameRate;
        let ease = new BABYLON.CubicEase();
        ease.setEasingMode(2);
        let animationPosition = BABYLON.Animation.CreateAnimation("position",
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            frameRate,
            ease
        );
        animationPosition.setKeys([
            {
                frame: 0,
                value: new BABYLON.Vector3(zonePosition.positionStart.x, zonePosition.positionStart.y, zonePosition.positionStart.z),
            },
            {
                frame: frameDuration,
                value: new BABYLON.Vector3(zonePosition.position.x, zonePosition.position.y, zonePosition.position.z),
            },
        ]);
        let animationTarget = BABYLON.Animation.CreateAnimation("target",
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            frameRate,
            ease
        );
        animationTarget.setKeys([
            {
                frame: 0,
                value: new BABYLON.Vector3(zonePosition.lookAtStart.x, zonePosition.lookAtStart.y, zonePosition.lookAtStart.z),
            },
            {
                frame: frameDuration,
                value: new BABYLON.Vector3(zonePosition.lookAt.x, zonePosition.lookAt.y, zonePosition.lookAt.z),
            },
        ]);
        scene.activeCamera.animations = [animationPosition, animationTarget];
        scene.beginAnimation(scene.activeCamera, 0, frameDuration, false, 2);
    }
    else {
        scene.activeCamera.position = new BABYLON.Vector3(zonePosition.position.x, zonePosition.position.y, zonePosition.position.z);
    }
};

engine.runRenderLoop(function () {
    VRMove();
    checkCurrentInfoZone()
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function () {
    engine.resize();
});
