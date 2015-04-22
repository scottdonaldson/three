function T() {

}

T.box = function(x, y, z) {
    return new THREE.BoxGeometry(x, y, z);
};

T.material = function(type, attrs) {

    var types = {
        basic: 'MeshBasicMaterial',
        lambert: 'MeshLambertMaterial'
    };

    if (type in types) {
        // include attributes
        if ( typeof attrs === 'object' ) {
            // default to white
            if (!attrs.color) attrs.color = '#fff';
            return new THREE[types[type]](attrs);
        // or, if a string, then it's the color
        } else if (typeof attrs === 'string') {
            return new THREE[types[type]]({ color: attrs });
        } else if ( !attrs ) {
            attrs = { color: '#fff' };
            return new THREE[types[type]](attrs);
        }
    }
};

T.mesh = function(geo, material) {
    return new THREE.Mesh(geo, material);
};
