function Pierna(){

THREE.Object3D.call(this);

this.pierna= new THREE.Mesh (new THREE.BoxGeometry(1,5,1));
this.pie= new THREE.Mesh (new THREE.BoxGeometry(2,1,1));

this.pierna.position.y=-2.5;
this.pie.position.y=-4.5;
this.pie.position.x=1;

this.add(this.pierna);
this.add(this.pie);
}

Pierna.prototype= new THREE.Object3D();

function setup(){

var cuerpo= new THREE.Mesh(new THREE.CylinderGeometry(1,2,5,10));
piernaD= new Pierna();
piernaI= new Pierna();
cuerpo.position.y=2;
piernaD.position.z= -1;
piernaI.position.z= 1;
step= .01;
escena= new THREE.Scene();
escena.add(cuerpo);
escena.add(piernaD);
escena.add(piernaI);
camara= new THREE.PerspectiveCamera();
camara.position.z=20;

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild (renderer.domElement);
}


//AGREGADO


	function Pelota(radius){
        var _step=0.1;
        var _colision=0;
        var _radius=radius;
        this.__proto__=new THREE.Mesh(new THREE.SphereGeometry(_radius),new THREE.MeshNormalMaterial()); //Herencia
        var _raycaster= new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0));
        this.setStep =function(step){_step=step;}
        this.getStep= function(){return _step;}

        this.setRadius = function(radius){_radius=radius;}
        this.getRadius = function(){ return _radius;}

        this.sensar = function(escena){
        	_raycaster.set(this.position, new THREE.Vector3(1,0,0));
        	var obstaculo1 = _raycaster.intersectObjects(escena.children);

        	_raycaster.set(this.position, new THREE.Vector3(-1,0,0));
        	var obstaculo2 = _raycaster.intersectObjects(escena.children);

        	if ((obstaculo1.length>0 && (obstaculo1[0].distance
        		<= radius))|| (obstaculo2.length>0 && (obstaculo2[0].distance<= radius)))
        		_colision = 1;
        	else
        		_colision = 0;
        }
        this.evaluar = function(escena){
        	if (_colision===1)
        		_step=-_step;
        	this.position.x += _step;
        }

    }
    	function Pared (size,x,y){
			var _size=size;
			this.__proto__= new THREE.Mesh( new THREE.BoxGeometry( _size, _size, _size),new THREE.MeshNormalMaterial());
			this.position.x= x;
			this.position.y= y;

			this.setSize = function(size){_size=size;}
			this.getSize = function(){ return _size;}
    	}

    	function sensar(escena){
    		for (var i = 0; i<escena.children.length; i++) {
    			if (escena.children[i].sensar !== undefined)
    				escena.children[i].sensar(escena);
    		}
    	}

    	function evaluar(escena){
    		for (var i = 0; i<escena.children.length; i++) {
    			if (escena.children[i].evaluar !== undefined)
    				escena.children[i].evaluar(escena);
    		}
    	}

      //////////////////////////////////////////////////////
		
      var pared1 = new Pared(1,7,0);
      var pared2 = new Pared(1,-7,0);
      var pelota = new Pelota(0.5);

	  escena.add(pared1);
	  escena.add(pared2);
	  escena.add(pelota);
	  escena.add(camara);




//FIN













function loop(){
requestAnimationFrame (loop);

renderer.render(escena, camara);
if (Math.abs(piernaD.rotation.z) >.5)
step=-step;
piernaD.rotation.z += step;
piernaI.rotation.z -= step;
}

var escena, camara, renderer;
var step, piernaD, piernaI, pared1, pared2;






setup();
loop();
