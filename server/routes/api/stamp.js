/**
 * @apiDefine apiGroupStamp Stamp
 *
 * A user account must exist before creating stamps is allowed. Individual stamps do not require
 * a catalogue or classification system. Associating a stamp with a catalogue system is purely
 * optional.
 *
 * <h4 id="stampObject" class="object-anchor">Stamp Object</h4>
 * <pre>
 * {<br />
 *     // User that owns the stamp.<br />
 *     user: { type: Schema.Types.ObjectId, ref: 'User' },<br />
 *     // Title or short name of stamp.<br />
 *     name: String,<br />
 *     // Description of stamp.<br />
 *     description: String,<br />
 *     // Url of image.<br />
 *     image: [String],<br />
 *     // How long this stamp was held.<br />
 *     aquired: {<br />
 *         // Date stamp was first aquired.<br />
 *         from: Date,<br />
 *         // Date stamp was released.<br />
 *         to: Date,<br />
 *         // Details of stamp acquisition and release.<br />
 *         description: String<br />
 *     },<br />
 *     // Catalogues<br />
 *     catalogue: {<br />
 *         // Stampist catalogue reference.<br />
 *         stampist: { type: Schema.Types.ObjectId, ref: 'CatalogueStampist' },<br />
 *         // Scott catalogue reference.<br />
 *         scott: { type: Schema.Types.ObjectId, ref: 'CatalogueScott' }<br />
 *     },<br />
 *     // Meta information.<br />
 *     meta: {<br />
 *         created: Date,<br />
 *         updated: Date,<br />
 *     }<br />
 * }
 * </pre>
 */

var User = require('../../models/user');
var Stamp = require('../../models/stamps/stamp');

module.exports = function(app, router) {
    /**
     * @api {get} /api/stamp Read all
     * @apiPermission apiPermissionAdmin
     * @apiGroup apiGroupStamp
     * @apiName ReadAll
     * @apiDescription Read details for all stamps.
     * @apiUse apiHeaderAccessToken
     * @apiUse apiSuccessStatus
     * @apiSuccess {Array} data An array of stamp objects.
     * @apiSuccessExample One Stamp Found
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *         "data": [
     *             <a href="#stampObject" class="object-link">Stamp Object</a>
     *         ]
     *     }
     * @apiSuccessExample No Stamps Found
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *         "data": []
     *     }
     * @apiUse apiErrorGeneric
     * @apiUse apiErrorExampleNotAuthorized
     * @apiUse apiErrorExampleFailure
     */
    router.get('/api/stamp', function(req, res) {
        if (req.decoded.roles.indexOf("admin") == -1) {
            res.notAuthorized()
        } else {
            Stamp.find({}, function(err, stamps) {
                if (err) {
                    res.unknown(err);
                } else {
                    res.json({
                        "status": true,
                        "data": stamps
                    });
                }
            });
        }
    });
}
