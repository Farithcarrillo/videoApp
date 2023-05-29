const express = require('express');
const responses = require('../../network/responses');
const controller = require('./index');
const security = require('./security');

const router = express.Router();

/**
 * @openapi
 /api/videos:
 *   get:
 *     summary: Obtiene todos los videos
 *     description: Retorna una lista de todos los videos registrados.
 *     responses:
 *       200:
 *         description: Lista de videos obtenida correctamente.
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
router.get('/:id', getById);
router.put('/', remove);
router.post('/', security(), add);


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
            message = 'Item guardado con exito';
        }else{
            message = 'Item actualizado con exito';
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