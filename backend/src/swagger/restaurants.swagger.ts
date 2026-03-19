/**
 * @openapi
 * /api/restaurants:
 *   get:
 *     tags:
 *       - Restaurants
 *     summary: get restaurants
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, example: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, example: 10, default: 10, minimum: 1, maximum: 100 }
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     restaurants:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Restaurant'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 *       '400':
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   post:
 *     tags:
 *       - Restaurants
 *     summary: create restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRestaurant'
 *     responses:
 *       '201':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Restaurant'
 *       '400':
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/restaurants/{id}:
 *   patch:
 *     tags:
 *       - Restaurants
 *     summary: update restaurant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, example: 30 }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRestaurant'
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Restaurant'
 *       '400':
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/restaurants/recommend:
 *   get:
 *     tags:
 *       - Restaurants
 *     summary: recommend ONE restaurant
 *     parameters:
 *       - in: query
 *         name: budget
 *         schema: { type: number, example: 100 }
 *       - in: query
 *         name: speed
 *         schema: { type: string, enum: [fast, normal, slow], example: fast }
 *       - in: query
 *         name: cuisine
 *         schema: { type: string, enum: ["chinese", "congee", "noodle", "hotpot", "japanese", "korean", "western", "fastfood", "thai"], example: chinese }
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Restaurant'
 *       '400':
 *         description: error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
