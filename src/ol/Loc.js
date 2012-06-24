goog.provide('ol.Loc');

goog.require('ol.Projection');



/**
 * @export
 * @constructor
 * @param {number} x X.
 * @param {number} y Y.
 * @param {number=} opt_z Z.
 * @param {ol.Projection=} opt_projection Projection.
 */
ol.Loc = function(x, y, opt_z, opt_projection) {

    /**
     * @private
     * @type {number}
     */
    this.x_ = x;
    
    /**
     * @private
     * @type {number}
     */
    this.y_ = y;
    
    /**
     * @private
     * @type {number|undefined}
     */
    this.z_ = opt_z;
    
    /**
     * @private
     * @type {ol.Projection}
     */
    this.projection_ = goog.isDef(opt_projection) ? opt_projection : null;

};


/**
 * @return {ol.Projection|undefined} Projection.
 */
ol.Loc.prototype.getProjection = function() {
    return this.projection_;
};


/**
 * @return {number} X.
 */
ol.Loc.prototype.getX = function() {
    return this.x_;
};


/**
 * @return {number} Y.
 */
ol.Loc.prototype.getY = function() {
    return this.y_;
};


/**
 * @return {number|undefined} Z.
 */
ol.Loc.prototype.getZ = function() {
    return this.z_;
};


/**
 * @param {ol.Projection} projection Projection.
 */
ol.Loc.prototype.setProjection = function(projection) {
    this.projection_ = projection;
};


/**
 * @param {number} x X.
 */
ol.Loc.prototype.setX = function(x) {
    this.x_ = x;
};


/**
 * @param {number} y Y.
 */
ol.Loc.prototype.setY = function(y) {
    this.y_ = y;
};


/**
 * @param {number|undefined} z Z.
 */
ol.Loc.prototype.setZ = function(z) {
    this.z_ = z;
};

/**
 * Transform this location to a new location given a projection object.
 *
 * @param {ol.Projection} proj The destination projection.
 * @returns {ol.Loc}
 */
ol.Loc.prototype.doTransform = function(proj) {
    var point = {'x': this.x_, 'y': this.y_};
    var sourceProj = this.projection_;
    if (!goog.isDefAndNotNull(sourceProj)) {
        throw new Error("Cannot transform a location without a source projection.");
    }
    ol.Projection.transform(point, sourceProj, proj);
    return new ol.Loc(point['x'], point['y'], this.z_, proj);
};

/**
 * Adds the passed x, y(, z) delta to a new location.
 *
 * @param {number} x
 * @param {number} y
 * @param {number=} opt_z
 * @returns {ol.Loc}
 */
ol.Loc.prototype.add = function(x, y, opt_z) {
    var newZ;
    if (goog.isDef(this.z_)) {
        newZ = (opt_z || 0) + this.z_;
    }
    return new ol.Loc(this.x_ + x, this.y_ + y, newZ, this.projection_);
};

/**
 * Clean up.
 * @export
 */
ol.Loc.prototype.destroy = function() {
    for (var key in this) {
        delete this[key];
    }
};
