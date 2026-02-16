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
exports.Position = void 0;
var typeorm_1 = require("typeorm");
var election_entity_1 = require("../elections/election.entity");
var candidate_entity_1 = require("../candidates/candidate.entity");
var Position = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('positions')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _position_name_decorators;
    var _position_name_initializers = [];
    var _position_name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _max_votes_decorators;
    var _max_votes_initializers = [];
    var _max_votes_extraInitializers = [];
    var _election_decorators;
    var _election_initializers = [];
    var _election_extraInitializers = [];
    var _election_id_decorators;
    var _election_id_initializers = [];
    var _election_id_extraInitializers = [];
    var _candidates_decorators;
    var _candidates_initializers = [];
    var _candidates_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var Position = _classThis = /** @class */ (function () {
        function Position_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.position_name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _position_name_initializers, void 0));
            this.description = (__runInitializers(this, _position_name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.max_votes = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _max_votes_initializers, void 0));
            this.election = (__runInitializers(this, _max_votes_extraInitializers), __runInitializers(this, _election_initializers, void 0));
            this.election_id = (__runInitializers(this, _election_extraInitializers), __runInitializers(this, _election_id_initializers, void 0));
            this.candidates = (__runInitializers(this, _election_id_extraInitializers), __runInitializers(this, _candidates_initializers, void 0));
            this.created_at = (__runInitializers(this, _candidates_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            __runInitializers(this, _created_at_extraInitializers);
        }
        return Position_1;
    }());
    __setFunctionName(_classThis, "Position");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _position_name_decorators = [(0, typeorm_1.Column)({ length: 100 })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _max_votes_decorators = [(0, typeorm_1.Column)({ default: 1 })];
        _election_decorators = [(0, typeorm_1.ManyToOne)(function () { return election_entity_1.Election; }, function (election) { return election.positions; }), (0, typeorm_1.JoinColumn)({ name: 'election_id' })];
        _election_id_decorators = [(0, typeorm_1.Column)()];
        _candidates_decorators = [(0, typeorm_1.OneToMany)(function () { return candidate_entity_1.Candidate; }, function (candidate) { return candidate.position; })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _position_name_decorators, { kind: "field", name: "position_name", static: false, private: false, access: { has: function (obj) { return "position_name" in obj; }, get: function (obj) { return obj.position_name; }, set: function (obj, value) { obj.position_name = value; } }, metadata: _metadata }, _position_name_initializers, _position_name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _max_votes_decorators, { kind: "field", name: "max_votes", static: false, private: false, access: { has: function (obj) { return "max_votes" in obj; }, get: function (obj) { return obj.max_votes; }, set: function (obj, value) { obj.max_votes = value; } }, metadata: _metadata }, _max_votes_initializers, _max_votes_extraInitializers);
        __esDecorate(null, null, _election_decorators, { kind: "field", name: "election", static: false, private: false, access: { has: function (obj) { return "election" in obj; }, get: function (obj) { return obj.election; }, set: function (obj, value) { obj.election = value; } }, metadata: _metadata }, _election_initializers, _election_extraInitializers);
        __esDecorate(null, null, _election_id_decorators, { kind: "field", name: "election_id", static: false, private: false, access: { has: function (obj) { return "election_id" in obj; }, get: function (obj) { return obj.election_id; }, set: function (obj, value) { obj.election_id = value; } }, metadata: _metadata }, _election_id_initializers, _election_id_extraInitializers);
        __esDecorate(null, null, _candidates_decorators, { kind: "field", name: "candidates", static: false, private: false, access: { has: function (obj) { return "candidates" in obj; }, get: function (obj) { return obj.candidates; }, set: function (obj, value) { obj.candidates = value; } }, metadata: _metadata }, _candidates_initializers, _candidates_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Position = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Position = _classThis;
}();
exports.Position = Position;
