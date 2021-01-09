export function initScene(engine, canvas) {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI/5.3, Math.PI/1.8, 75, new BABYLON.Vector3(0, 10, 0), scene);
    
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
    light.intensity = 0.7;
  
    var spot = new BABYLON.SpotLight("spot", new BABYLON.Vector3(25, 15, -10), new BABYLON.Vector3(-1, -0.8, 1), 15, 1, scene);
    spot.diffuse = new BABYLON.Color3(1, 1, 1);
    spot.specular = new BABYLON.Color3(0, 0, 0);
    spot.intensity = 0.8;
	
    // scene.createDefaultCameraOrLight(true, true, true);
    var texture = new BABYLON.CubeTexture("./tr.dds", scene);

    scene.createDefaultSkybox(texture,
    true,
    10000,
    0,
    false
    )

    return {scene}
}


export function changeColoroMatt(scene, color) {

    var mat = new BABYLON.StandardMaterial("mat1", scene);
    // var mat = test1(scene)
    mat.alpha = 1.0;
    mat.diffuseColor = new BABYLON.Color3.FromHexString(color)
    // mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    mat.backFaceCulling = false;
    mat.wireframe = false;
    return mat;
}

export function changeColor(scene, color) {
    if(color == "#FF0000") {
        var skin = changeColoroMatt(scene, color);
    } else if(color == "#121213") {
        var skin = changeColorPBR(scene, .8, color)
    }
    else {
        var skin = changeColorPBR(scene, .3, color)    
    }

    return skin

}

function changeColorPBR(scene, rough, color) {
    var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);

    pbr.baseColor = new BABYLON.Color3.FromHexString(color)
    pbr.metallic = 1; // set to 1 to only use it from the metallicRoughnessTexture
    pbr.roughness = rough; // set to 1 to only use it from the metallicRoughnessTexture
    pbr.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("./tr.dds", scene);
    pbr.backFaceCulling = false;
    return pbr
}