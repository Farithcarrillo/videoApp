const express = require('express');

const security  = require('./security');
const responses  = require('../../network/responses');
const controller = require('./index');
const {validateCreate} = require('./validator');

const router = express.Router();

/**
 * @openapi
 /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Retorna una lista de todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 */
router.get('/', getAll);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene los datos de un usuario por ID
 *     description: Retorna los datos de un usuario específico basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 */
router.get('/:id', getById);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene los datos de un usuario por ID
 *     description: Retorna los datos de un usuario     específico basado en su ID.
 *     parameters:
 *       - name: id
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 
 */
router.get('/:id', getById);
router.post('/', validateCreate, add);
router.put('/', security(), remove);


async function getAll(req, res, next) {
    try {
      const items = await controller.getAll();
      responses.success(req, res, items, 200);
    } catch (error) {
      next(error);
    }
}

async function getById(req, res, next) {
    try {
      const items = await controller.getById(req.params.id);
      responses.success(req, res, items, 200);
    } catch (error) {
      next(error);
    }
}

async function add(req, res, next) {
    try {
        let message;
        const items = await controller.add(req.body);
        if (req.body.id === 0) {
            message  = 'Item guardado con exito';
        }else{
            message  = 'Item actualizado con exito';
        }
        responses.success(req, res, message, 201);
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        const items = await controller.remove(req.body);
        responses.success(req, res, 'Item eliminado satisfactoriamente', 200);
    } catch (error) {
        next(error);
    }
    
};

module.exports = router;