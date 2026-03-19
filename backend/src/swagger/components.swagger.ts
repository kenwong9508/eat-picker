/**
 * @openapi
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: 生記粥品
 *         avgPrice:
 *           type: number
 *           example: 45
 *         speed:
 *           type: string
 *           enum: [fast, normal, slow]
 *           example: fast
 *         cuisine:
 *           type: string
 *           enum: ["chinese", "congee", "noodle", "hotpot", "japanese", "korean", "western", "fastfood", "thai"]
 *           example: chinese
 *         takeaway:
 *           type: boolean
 *           example: true
 *         dineIn:
 *           type: boolean
 *           example: true
 *         active:
 *           type: boolean
 *           example: true
 *         address:
 *           type: string
 *           example: 新界沙田馬鞍山西沙路608號馬鞍山廣場2樓2135-2139號舖
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: '2026-03-04T22:49:31.905Z'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: '2026-03-09T14:25:00.000Z'
 *     Pagination:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         total:
 *           type: integer
 *           example: 37
 *         pages:
 *           type: integer
 *           example: 13
 *         hasNext:
 *           type: boolean
 *           example: true
 *     CreateRestaurant:
 *       type: object
 *       required:
 *         - name
 *         - avgPrice
 *         - speed
 *         - cuisine
 *       properties:
 *         name:
 *           type: string
 *           example: 生記粥品馬鞍山
 *         avgPrice:
 *           type: number
 *           example: 45
 *         speed:
 *           type: string
 *           enum: [fast, normal, slow]
 *           example: fast
 *         cuisine:
 *           type: string
 *           enum: ["chinese", "congee", "noodle", "hotpot", "japanese", "korean", "western", "fastfood", "thai"]
 *           example: chinese
 *         takeaway:
 *           type: boolean
 *           example: true
 *         dineIn:
 *           type: boolean
 *           example: true
 *         address:
 *           type: string
 *           example: 新界沙田馬鞍山西沙路608號馬鞍山廣場2樓2135-2139號舖
 *     UpdateRestaurant:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         avgPrice:
 *           type: number
 *         speed:
 *           type: string
 *           enum: [fast, normal, slow]
 *         cuisine:
 *           type: string
 *           enum: ["chinese", "congee", "noodle", "hotpot", "japanese", "korean", "western", "fastfood", "thai"]
 *           example: chinese
 *         takeaway:
 *           type: boolean
 *         dineIn:
 *           type: boolean
 *         address:
 *           type: string
 *         active:
 *           type: boolean
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               example: VAL-001
 *             message:
 *               type: string
 *               example: error message
 */
