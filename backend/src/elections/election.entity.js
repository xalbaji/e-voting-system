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
exports.Election = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../users/user.entity");
var position_entity_1 = require("../positions/position.entity");
var Election = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('elections')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _start_date_decorators;
    var _start_date_initializers = [];
    var _start_date_extraInitializers = [];
    var _end_date_decorators;
    var _end_date_initializers = [];
    var _end_date_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _created_by_decorators;
    var _created_by_initializers = [];
    var _created_by_extraInitializers = [];
    var _created_by_id_decorators;
    var _created_by_id_initializers = [];
    var _created_by_id_extraInitializers = [];
    var _positions_decorators;
    var _positions_initializers = [];
    var _positions_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var Election = _classThis = /** @class */ (function () {
        function Election_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.start_date = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _start_date_initializers, void 0));
            this.end_date = (__runInitializers(this, _start_date_extraInitializers), __runInitializers(this, _end_date_initializers, void 0));
            this.status = (__runInitializers(this, _end_date_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.created_by = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _created_by_initializers, void 0));
            this.created_by_id = (__runInitializers(this, _created_by_extraInitializers), __runInitializers(this, _created_by_id_initializers, void 0));
            this.positions = (__runInitializers(this, _created_by_id_extraInitializers), __runInitializers(this, _positions_initializers, void 0));
            this.created_at = (__runInitializers(this, _positions_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            __runInitializers(this, _created_at_extraInitializers);
        }
        return Election_1;
    }());
    __setFunctionName(_classThis, "Election");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _title_decorators = [(0, typeorm_1.Column)({ length: 100 })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _start_date_decorators = [(0, typeorm_1.Column)({ type: 'datetime', nullable: true })];
        _end_date_decorators = [(0, typeorm_1.Column)({ type: 'datetime', nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({ default: 'upcoming' })];
        _created_by_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'created_by' })];
        _created_by_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _positions_decorators = [(0, typeorm_1.OneToMany)(function () { return position_entity_1.Position; }, function (position) { return position.election; })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _start_date_decorators, { kind: "field", name: "start_date", static: false, private: false, access: { has: function (obj) { return "start_date" in obj; }, get: function (obj) { return obj.start_date; }, set: function (obj, value) { obj.start_date = value; } }, metadata: _metadata }, _start_date_initializers, _start_date_extraInitializers);
        __esDecorate(null, null, _end_date_decorators, { kind: "field", name: "end_date", static: false, private: false, access: { has: function (obj) { return "end_date" in obj; }, get: function (obj) { return obj.end_date; }, set: function (obj, value) { obj.end_date = value; } }, metadata: _metadata }, _end_date_initializers, _end_date_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _created_by_decorators, { kind: "field", name: "created_by", static: false, private: false, access: { has: function (obj) { return "created_by" in obj; }, get: function (obj) { return obj.created_by; }, set: function (obj, value) { obj.created_by = value; } }, metadata: _metadata }, _created_by_initializers, _created_by_extraInitializers);
        __esDecorate(null, null, _created_by_id_decorators, { kind: "field", name: "created_by_id", static: false, private: false, access: { has: function (obj) { return "created_by_id" in obj; }, get: function (obj) { return obj.created_by_id; }, set: function (obj, value) { obj.created_by_id = value; } }, metadata: _metadata }, _created_by_id_initializers, _created_by_id_extraInitializers);
        __esDecorate(null, null, _positions_decorators, { kind: "field", name: "positions", static: false, private: false, access: { has: function (obj) { return "positions" in obj; }, get: function (obj) { return obj.positions; }, set: function (obj, value) { obj.positions = value; } }, metadata: _metadata }, _positions_initializers, _positions_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Election = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Election = _classThis;
}();
exports.Election = Election;
