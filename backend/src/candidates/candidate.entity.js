"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate = void 0;
var typeorm_1 = require("typeorm");
var position_entity_1 = require("../positions/position.entity");
var Candidate = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('candidates')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _first_name_decorators;
    var _first_name_initializers = [];
    var _first_name_extraInitializers = [];
    var _last_name_decorators;
    var _last_name_initializers = [];
    var _last_name_extraInitializers = [];
    var _photo_decorators;
    var _photo_initializers = [];
    var _photo_extraInitializers = [];
    var _biography_decorators;
    var _biography_initializers = [];
    var _biography_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _position_decorators;
    var _position_initializers = [];
    var _position_extraInitializers = [];
    var _position_id_decorators;
    var _position_id_initializers = [];
    var _position_id_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var Candidate = _classThis = /** @class */ (function () {
        function Candidate_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.first_name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _first_name_initializers, void 0));
            this.last_name = (__runInitializers(this, _first_name_extraInitializers), __runInitializers(this, _last_name_initializers, void 0));
            this.photo = (__runInitializers(this, _last_name_extraInitializers), __runInitializers(this, _photo_initializers, void 0));
            this.biography = (__runInitializers(this, _photo_extraInitializers), __runInitializers(this, _biography_initializers, void 0));
            this.status = (__runInitializers(this, _biography_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.position = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _position_initializers, void 0));
            this.position_id = (__runInitializers(this, _position_extraInitializers), __runInitializers(this, _position_id_initializers, void 0));
            this.created_at = (__runInitializers(this, _position_id_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            __runInitializers(this, _created_at_extraInitializers);
        }
        Object.defineProperty(Candidate_1.prototype, "fullName", {
            get: function () {
                return "".concat(this.first_name, " ").concat(this.last_name);
            },
            enumerable: false,
            configurable: true
        });
        return Candidate_1;
    }());
    __setFunctionName(_classThis, "Candidate");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _first_name_decorators = [(0, typeorm_1.Column)({ length: 50 })];
        _last_name_decorators = [(0, typeorm_1.Column)({ length: 50 })];
        _photo_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _biography_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({ default: 'active' })];
        _position_decorators = [(0, typeorm_1.ManyToOne)(function () { return position_entity_1.Position; }, function (position) { return position.candidates; }), (0, typeorm_1.JoinColumn)({ name: 'position_id' })];
        _position_id_decorators = [(0, typeorm_1.Column)()];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _first_name_decorators, { kind: "field", name: "first_name", static: false, private: false, access: { has: function (obj) { return "first_name" in obj; }, get: function (obj) { return obj.first_name; }, set: function (obj, value) { obj.first_name = value; } }, metadata: _metadata }, _first_name_initializers, _first_name_extraInitializers);
        __esDecorate(null, null, _last_name_decorators, { kind: "field", name: "last_name", static: false, private: false, access: { has: function (obj) { return "last_name" in obj; }, get: function (obj) { return obj.last_name; }, set: function (obj, value) { obj.last_name = value; } }, metadata: _metadata }, _last_name_initializers, _last_name_extraInitializers);
        __esDecorate(null, null, _photo_decorators, { kind: "field", name: "photo", static: false, private: false, access: { has: function (obj) { return "photo" in obj; }, get: function (obj) { return obj.photo; }, set: function (obj, value) { obj.photo = value; } }, metadata: _metadata }, _photo_initializers, _photo_extraInitializers);
        __esDecorate(null, null, _biography_decorators, { kind: "field", name: "biography", static: false, private: false, access: { has: function (obj) { return "biography" in obj; }, get: function (obj) { return obj.biography; }, set: function (obj, value) { obj.biography = value; } }, metadata: _metadata }, _biography_initializers, _biography_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _position_decorators, { kind: "field", name: "position", static: false, private: false, access: { has: function (obj) { return "position" in obj; }, get: function (obj) { return obj.position; }, set: function (obj, value) { obj.position = value; } }, metadata: _metadata }, _position_initializers, _position_extraInitializers);
        __esDecorate(null, null, _position_id_decorators, { kind: "field", name: "position_id", static: false, private: false, access: { has: function (obj) { return "position_id" in obj; }, get: function (obj) { return obj.position_id; }, set: function (obj, value) { obj.position_id = value; } }, metadata: _metadata }, _position_id_initializers, _position_id_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Candidate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Candidate = _classThis;
}();
exports.Candidate = Candidate;
