function setup () {

//Se plantea las geometrias a utilizar

var esferaForma = new THREE.SphereGeometry(1);
var cilindroForma= new THREE.CylinderGeometry (0.5,0.5,4);

//Para poder generar una forma combinada se requiere de las mallas para
//poder desplazar las formas en el espacio virtual

var esfera1= new THREE.Mesh(esferaForma);
var esfera2= new THREE.Mesh(esferaForma); 
var cilindro= new THREE.Mesh(cilindroForma);

//se desplazan las mallas
esfera1.position.y=2;
esfera2.position.y=-2;

//se genera una forma (geometría) abstracta.

var forma = new THREE.Geometry();

//Se utiliza el paquete GeometryUtils para conjuntar las formas

THREE.GeometryUtils.merge(forma, esfera1);
THREE.GeometryUtils.merge(forma, esfera2);
THREE.GeometryUtils.merge(forma, cilindro);

//se genera la malla a partir de la forma

malla= new THREE.Mesh(forma);

/

//Se inicializa la escena y se agrega la malla a esta.

escena= new THREE.Scene();
escena.add(malla);

camara=new THREE.PerspectiveCamera();
camara.position.z=10;
//
renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*.95, window.innerHeight*.95);
document.body.appendChild(renderer.domElement);
}

function loop() {
  RrequestAnimationFrame(loop);
  
  //Es importante notar que las rotaciuons son sobre los ejes que estan fijos
  //a la malla, no los ejes del lienzo. Inicialmente
  //ambos coinciden.
  
  malla.rotation.x += 0.01;
  malla.rotation.y += 0.01;
  
  renderer.render ( escena, camara);
  }
  
  var escena, camara, renderer, malla;
  setup();
  loop();


