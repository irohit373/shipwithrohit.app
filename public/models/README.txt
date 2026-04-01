Drop your GLTF model files in this folder, for example:

public/models/laptop.gltf
public/models/laptop.bin
public/models/textures/...

Generate a typed React component from a model:

npx gltfjsx public/models/laptop.gltf -o src/components/three/laptop-model.jsx -t

Use compressed models (Draco/Meshopt) to keep draw calls and payload low.
