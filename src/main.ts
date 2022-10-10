import { Engine, Scene, FreeCamera, HemisphericLight,
  Vector3, MeshBuilder } from "@babylonjs/core"

function init() {
  const canvas: any = document.getElementById("renderCanvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const engine = new Engine(canvas)

  const scene = new Scene(engine)
  const camera = new FreeCamera("cam", new Vector3(0,5,-10), scene)
  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas, true)

  const light = new HemisphericLight("light", new Vector3(0,1,0), scene)
  light.intensity = 0.7

  const sphere = MeshBuilder.CreateSphere("sphere", {diameter:1, segments:32}, scene)
  sphere.position.y = 1

  for(let i=0; i<500; i++) {
    const sp = MeshBuilder.CreateSphere("sphere"+i, {diameter:0.2, segments:32}, scene)
    sp.position.x = i*0.2*(Math.random()-0.5)
    sp.position.y = i*0.2*(Math.random()-0.5)
    sp.position.z = i*0.2*(Math.random()-0.5)
  }


  scene.createDefaultEnvironment()
  const xrPromise = scene.createDefaultXRExperienceAsync()
  xrPromise.then((xr) => {
    console.log(xr)
  })

  engine.runRenderLoop(() => {
    scene.render()
  })

}

init()