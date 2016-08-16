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
     * @api {get} /api/collectible Read all
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
        if (!req.user.isAdmin()) {
            res.notAuthorized()
        } else {
            Collectible.find({}, function(err, collectibles) {
                if (err) {
                    res.failure(err);
                } else {
                    res.json({
                        "status": true,
                        "data": collectibles
                    });
                }
            });
        }
    });
    /**
     * @api {post} /api/collectible Create
     * @apiPermission apiPermissionUser
     * @apiGroup apiGroupCollectible
     * @apiName Create
     * @apiDescription Create an item that has been collected.
     * @apiUse apiHeaderAccessToken
     * @apiUse apiHeaderJson
     * @apiParamExample {JSON} Request Example
     *     {
     *         "name": "My Lucky Coin",
     *         "description": "This is the lucky coin that my grandfather gave to me.",
     *         "images": [
     *             "http://www.collectiblecms/u/admin/coin.png"
     *         ],
     *         "aquired": {
     *             "from": "2016-08-16T01:41:24.482Z",
     *             "to": null,
     *             "description": "He handed it to me with a smile."
     *         }
     *     }
     * @apiUse apiSuccessStatus
     * @apiSuccess {String} data A single collectible object.
     * @apiSuccessExample Collectible Created
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *         "data": {
     *             "userId": "8294a895902ee2048b238304",
     *             "_id": "57aacc69fb7e90e81aa5d5d5",
     *             "name": "My Lucky Coin",
     *             "description": "This is the lucky coin that my grandfather gave to me.",
     *             "images": [
     *                 "http://www.collectiblecms/u/admin/coin.png"
     *             ],
     *             "aquired": {
     *                 "from": "2016-08-16T01:41:24.482Z",
     *                 "to": null,
     *                 "description": "He handed it to me with a smile."
     *             }
     *             "meta": {
     *                 "created": "2016-08-16T01:41:24.482Z",
     *                 "updated": "2016-08-16T01:41:24.482Z"
     *             }
     *         }
     *     }
     * @apiUse apiErrorGeneric
     * @apiUse apiErrorExampleAccessToken
     * @apiUse apiErrorExampleNotAuthorized
     * @apiUse apiErrorExampleFailure
     */
    router.post('/api/collectible', function(req, res) {
        if (!req.user.isUser()) {
            res.notAuthorized();
        } else {
            req.body.userId = (typeof(req.body.userId) == "undefined" || !req.user.isAdmin()) ? req.user._id : req.body.userId;
            if (typeof(req.body['meta']) == 'undefined' || !req.user.isAdmin()) {
                req.body.meta = {
                    created: new Date,
                    updated: new Date
                };
            }
            var collectible = new Collectible(req.body);
            collectible.save(function(err) {
                if (err) {
                    res.failure(err);
                } else {
                    res.json({
                        "status": true,
                        "data": collectible
                    });
                }
            });
        }
    });
}
