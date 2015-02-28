(function() {

// shortcut... confusing? oh well
var t = THREE;

// T is opinionated!
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// thin wrapper
window.T = {
    renderer: new t.WebGLRenderer({ antialias: true }),
    camera: new t.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    ),
    scene: new t.Scene,
    clock: new t.Clock,
    box: function(sizeArr, posArr, color) {

        var box = new t.Mesh(
            new t.BoxGeometry(sizeArr[0], sizeArr[1], sizeArr[2]),
            new t.MeshLambertMaterial({ color: color || '#999' })
        );

        box.position.x = posArr[0];
        box.position.y = posArr[1];
        box.position.z = posArr[2];

        T.scene.add(box);

        return box;
    },
    render: function(func) {
        T.renderer.render(T.scene, T.camera);
        //if ( !!func ) func();
        requestAnimationFrame(T.render);
    }
};

T.renderer.shadowMapEnabled = true;

T.scene.add(T.camera);

T.renderer.setSize(WIDTH, HEIGHT);

window.addEventListener('DOMContentLoaded', function(){
    document.body.appendChild(T.renderer.domElement);
});

})();
