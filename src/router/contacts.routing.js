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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsRouter = void 0;
/**
 * Reqiured External Modules and Interfaces
 */
var express_1 = require("express");
var contacts_1 = require("../model/contacts");
var express_validator_1 = require("express-validator");
/**
 * Router Definition
 */
exports.itemsRouter = express_1.default.Router();
/**
 * Controller Definitions
 */
// Get items
exports.itemsRouter.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var items, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, contacts_1.ContactModel.find()];
            case 1:
                items = _a.sent();
                res.status(200).json(items);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(404).send(e_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get items/:id
exports.itemsRouter.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, item, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, contacts_1.ContactModel.findById(id)];
            case 2:
                item = _a.sent();
                if (item) {
                    return [2 /*return*/, res.status(200).json(item)];
                }
                else {
                    return [2 /*return*/, res.status(404).send("Not Found")];
                }
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                res.status(500).send(e_2.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Post items
exports.itemsRouter.post('/', [
    (0, express_validator_1.body)('name').custom(function (value) { return __awaiter(void 0, void 0, void 0, function () {
        var duplikat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contacts_1.ContactModel.findOne({ name: value })];
                case 1:
                    duplikat = _a.sent();
                    if (duplikat)
                        throw new Error("Nama sudah digunakan");
                    return [2 /*return*/, true];
            }
        });
    }); }),
    (0, express_validator_1.check)("email", "Email tidak valid!").isEmail(),
    (0, express_validator_1.check)('phone', "Phone tidak valid!").isMobilePhone('id-ID')
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, item, newItem, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!!errors.isEmpty()) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).json(errors.array())];
            case 1:
                item = req.body;
                return [4 /*yield*/, contacts_1.ContactModel.create(item)];
            case 2:
                newItem = _a.sent();
                res.status(201).json({
                    message: "Success",
                    newItem: newItem,
                    status: 201
                });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                res.status(500).send(e_3.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Put items/:id
exports.itemsRouter.put('/:id', [
    (0, express_validator_1.body)('name').custom(function (value, _a) {
        var req = _a.req;
        return __awaiter(void 0, void 0, void 0, function () {
            var id, duplikat, oldNameCheck, name;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
                        return [4 /*yield*/, contacts_1.ContactModel.findOne({ name: value })];
                    case 1:
                        duplikat = _c.sent();
                        return [4 /*yield*/, contacts_1.ContactModel.findById(id)];
                    case 2:
                        oldNameCheck = _c.sent();
                        name = 'name';
                        if (duplikat && (!oldNameCheck || value !== oldNameCheck[name]))
                            throw new Error("Nama sudah digunakan");
                        return [2 /*return*/, true];
                }
            });
        });
    }),
    (0, express_validator_1.check)("email", "Email tidak valid!").isEmail(),
    (0, express_validator_1.check)('phone', "Phone tidak valid!").isMobilePhone('id-ID')
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, errors, itemUpdate, exitingItem, updatedItem, newItem, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                id = req.params.id;
                errors = (0, express_validator_1.validationResult)(req);
                if (!!errors.isEmpty()) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).json(errors.array())];
            case 1:
                itemUpdate = req.body;
                return [4 /*yield*/, contacts_1.ContactModel.findById(id)];
            case 2:
                exitingItem = _a.sent();
                if (!exitingItem) return [3 /*break*/, 4];
                return [4 /*yield*/, contacts_1.ContactModel.findByIdAndUpdate({ _id: id }, {
                        $set: {
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone,
                        },
                    })];
            case 3:
                updatedItem = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "success",
                        itemUpdate: itemUpdate
                    })];
            case 4: return [4 /*yield*/, contacts_1.ContactModel.create(itemUpdate)];
            case 5:
                newItem = _a.sent();
                res.status(201).send(newItem);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                e_4 = _a.sent();
                res.status(500).send(e_4.message);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
// Delete items/:id
exports.itemsRouter.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, item, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, contacts_1.ContactModel.findById(id)];
            case 1:
                item = _a.sent();
                console.log(item);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, contacts_1.ContactModel.deleteOne({ _id: id })];
            case 3:
                _a.sent();
                res.status(200).send("deleted successfully");
                return [3 /*break*/, 5];
            case 4:
                e_5 = _a.sent();
                res.status(500).send(e_5.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
