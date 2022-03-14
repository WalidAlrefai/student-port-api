'use strict';

const express = require('express');
const router = express.Router();
const acl = require('../middelware/acl');
const bearer = require('../middelware/brearer');
const { users } = require('../models/index');


router.get('/users', bearer, acl('read'), getAllHandler);
router.get('/users/:id', bearer, acl('read'), getOneHandler);
router.put('/users/:id', bearer, acl('update'), updateHandler);
router.delete('/users/:id', bearer, acl('delete'), deleteHandler);

async function getAllHandler(req, res) {
    let allUsers = await users.findAll();
    res.status(200).json(allUsers);
}

async function getOneHandler(req, res) {

    let id = req.params.id
    let oneUser = await users.findOne({ where: { id: id } })
    res.status(201).json(oneUser);
}

async function updateHandler(req, res) {
    let id = req.params.id
    let oneUser = await users.findOne({ where: { id: id } })
    if (oneUser.role == 'student') {
        const user = await oneUser.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        res.status(201).json(user)
    } else {
        let updateduser = await oneUser.update(req.body);
        res.status(201).json(updateduser);
    }
}

async function deleteHandler(req, res) {
    const id = req.params.id;
    const deleteduser = await users.destroy({ where: { id } });
    res.status(204).json(deleteduser);
}
module.exports = router