/**
 * @apiDefine apiGroupCollectible Collectible
 *
 * A collectible is an individual item that has been collected, such as a stamp or coin. A user
 * account must exist before creating collectibles is allowed. An individual collectible does not require
 * a catalogue or classification system. A collectible, with a name and an image of a stamp, may be
 * created without expressly catagorizing the collectible as a stamp. Context of what an item is may
 * only be obtained by associating the collectible with a record in a catalogue (such as the
 * StampistCatalogue or ScottCatalogue).
 *
 * This allows a user to quickly create several records of items thaty have collected without the
 * requirement to search for it's appropriate catalogue entry or classification.
 *
 * <h4 id="collectibleObject" class="object-anchor">Collectible Object</h4>
 * <pre>
 * {<br />
 *     // User that owns the item.<br />
 *     userId: { type: Schema.Types.ObjectId, ref: 'User' },<br />
 *     // Title or short name of item.<br />
 *     name: String,<br />
 *     // Description of item.<br />
 *     description: String,<br />
 *     // Urls of image.<br />
 *     image: [String],<br />
 *     // How long this item was held.<br />
 *     aquired: {<br />
 *         // Date item was first aquired.<br />
 *         from: Date,<br />
 *         // Date item was released.<br />
 *         to: Date,<br />
 *         // Details of item acquisition and release.<br />
 *         description: String<br />
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
var Collectible = require('../../models/collectible');

module.exports = function(app, router) {
    /**
     * @api {get} /api/stamp Read all
     * @apiPermission apiPermissionAdmin
     * @apiGroup apiGroupCollectible
     * @apiName ReadAll
     * @apiDescription Read details for all collectibles.
     * @apiUse apiHeaderAccessToken
     * @apiUse apiSuccessStatus
     * @apiSuccess {Array} data An array of collectible objects.
     * @apiSuccessExample One Collectible Found
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *         "data": [
     *             <a href="#collectibleObject" class="object-link">Collectible Object</a>
     *         ]
     *     }
     * @apiSuccessExample No Collectibles Found
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *         "data": []
     *     }
     * @apiUse apiErrorGeneric
     * @apiUse apiErrorExampleNotAuthorized
     * @apiUse apiErrorExampleFailure
     */
    router.get('/api/collectible', function(req, res) {
        if (req.decoded.roles.indexOf("admin") == -1) {
            res.notAuthorized()
        } else {
            Collectible.find({}, function(err, collectibles) {
                if (err) {
                    res.unknown(err);
                } else {
                    res.json({
                        "status": true,
                        "data": collectibles
                    });
                }
            });
        }
    });
}
