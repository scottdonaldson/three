T = function() {

    var scene, camera, renderer;

    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight,
        VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 100000;

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        shadowMapEnabled: true
    });

    camera = new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );

    scene = new THREE.Scene;
    scene.add(camera);

    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    this.scene = scene;
    this.camera = normalize(camera);
    this.renderer = renderer;

    return this;
}

function shadows(thing) {
    thing.castShadow = true;
    thing.receiveShadow = true;
    return thing;
}

function normalize(thing) {
    ['x', 'y', 'z'].forEach(function(d) {
        var a = d;
        thing[d] = function(n) {
            this.position[a] = n;
        };
    });
    return thing;
};

Box = function(x, y, z) {
    var box = new THREE.BoxGeometry(x, y, z);
    return shadows(box);
};

Cylinder = function(rTop, rBottom, h, seg) {
    var cylinder = new THREE.CylinderGeometry(rTop, rBottom, h, seg);
    return shadows(cylinder);
}

Material = function(type, attrs) {

    var types = {
        basic: 'MeshBasicMaterial',
        lambert: 'MeshLambertMaterial',
        depth: 'MeshDepthMaterial',
        phong: 'MeshPhongMaterial'
    };

    if ( type in types ) {
        // include attributes
        if ( typeof attrs === 'object' && !attrs.color ) {
            // attrs.color = '#fff';
        // or, if a string, then it's the color
        } else if (typeof attrs === 'string') {
            attrs = { color: attrs };
        } else if ( !attrs ) {
            attrs = { color: '#fff' };
        }

        return new THREE[types[type]](attrs);
    }
};

T.prototype.mesh = function(geo, material) {
    var mesh = new T.Mesh(geo, material, this);
    return mesh;
};

T.prototype.light = function() {
    var light = new THREE.DirectionalLight('#fff');
    light.castShadow = true;
    this.scene.add(light);
    return normalize(light);
};

T.Mesh = function(geo, material, world) {
    var mesh = new THREE.Mesh(geo, material);
    world.scene.add(mesh);
    return normalize(mesh);
};

T.prototype.render = function(cb) {
    var t = 0,
        _this = this;
    function render() {
        _this.renderer.render(_this.scene, _this.camera);
        cb.bind(_this)(t);
        t++;
        requestAnimationFrame(render);
    }
    render();
}
