"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsRouter = void 0;
/**
 * Reqiured External Modules and Interfaces
 */
const express_1 = __importDefault(require("express"));
const contacts_1 = require("../model/contacts");
const express_validator_1 = require("express-validator");
/**
 * Router Definition
 */
exports.itemsRouter = express_1.default.Router();
/**
 * Controller Definitions
 */
// Get items
exports.itemsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield contacts_1.ContactModel.find();
        res.status(200).json(items);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
}));
// Get items/:id
exports.itemsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const item = yield contacts_1.ContactModel.findById(id);
        if (item) {
            return res.status(200).json(item);
        }
        else {
            return res.status(404).send("Not Found");
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// Post items
exports.itemsRouter.post('/', [
    (0, express_validator_1.body)('name').custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const duplikat = yield contacts_1.ContactModel.findOne({ name: value });
        if (duplikat)
            throw new Error("Nama sudah digunakan");
        return true;
    })),
    (0, express_validator_1.check)("email", "Email tidak valid!").isEmail(),
    (0, express_validator_1.check)('phone', "Phone tidak valid!").isMobilePhone('id-ID')
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        else {
            const item = req.body;
            const newItem = yield contacts_1.ContactModel.create(item);
            res.status(201).json({
                message: "Success",
                newItem,
                status: 201
            });
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// Put items/:id
exports.itemsRouter.put('/:id', [
    (0, express_validator_1.body)('name').custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
        const duplikat = yield contacts_1.ContactModel.findOne({ name: value });
        const oldNameCheck = yield contacts_1.ContactModel.findById(id);
        const name = 'name';
        if (duplikat && (!oldNameCheck || value !== oldNameCheck[name]))
            throw new Error("Nama sudah digunakan");
        return true;
    })),
    (0, express_validator_1.check)("email", "Email tidak valid!").isEmail(),
    (0, express_validator_1.check)('phone', "Phone tidak valid!").isMobilePhone('id-ID')
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        else {
            const itemUpdate = req.body;
            const exitingItem = yield contacts_1.ContactModel.findById(id);
            if (exitingItem) {
                const updatedItem = yield contacts_1.ContactModel.findByIdAndUpdate({ _id: id }, {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                    },
                });
                return res.status(200).json({
                    message: "success",
                    itemUpdate
                });
            }
            const newItem = yield contacts_1.ContactModel.create(itemUpdate);
            res.status(201).send(newItem);
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// Delete items/:id
exports.itemsRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const item = yield contacts_1.ContactModel.findById(id);
    console.log(item);
    try {
        yield contacts_1.ContactModel.deleteOne({ _id: id });
        res.status(200).send(`deleted successfully`);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
