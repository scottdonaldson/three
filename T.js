function T() {

}

T.box = function(x, y, z) {
    return new THREE.BoxGeometry(x, y, z);
};

T.cylinder = function(rTop, rBottom, h, seg) {
    return new THREE.CylinderGeometry(rTop, rBottom, h, seg);
}

T.material = function(type, attrs) {

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

T.mesh = function(geo, material) {
    return new THREE.Mesh(geo, material);
};
