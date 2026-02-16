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
exports.Vote = void 0;
var typeorm_1 = require("typeorm");
var election_entity_1 = require("../elections/election.entity");
var position_entity_1 = require("../positions/position.entity");
var candidate_entity_1 = require("../candidates/candidate.entity");
var user_entity_1 = require("../users/user.entity");
var Vote = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('votes'), (0, typeorm_1.Unique)(['election_id', 'position_id', 'voter_id'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _election_decorators;
    var _election_initializers = [];
    var _election_extraInitializers = [];
    var _election_id_decorators;
    var _election_id_initializers = [];
    var _election_id_extraInitializers = [];
    var _position_decorators;
    var _position_initializers = [];
    var _position_extraInitializers = [];
    var _position_id_decorators;
    var _position_id_initializers = [];
    var _position_id_extraInitializers = [];
    var _candidate_decorators;
    var _candidate_initializers = [];
    var _candidate_extraInitializers = [];
    var _candidate_id_decorators;
    var _candidate_id_initializers = [];
    var _candidate_id_extraInitializers = [];
    var _voter_decorators;
    var _voter_initializers = [];
    var _voter_extraInitializers = [];
    var _voter_id_decorators;
    var _voter_id_initializers = [];
    var _voter_id_extraInitializers = [];
    var _voted_at_decorators;
    var _voted_at_initializers = [];
    var _voted_at_extraInitializers = [];
    var Vote = _classThis = /** @class */ (function () {
        function Vote_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.election = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _election_initializers, void 0));
            this.election_id = (__runInitializers(this, _election_extraInitializers), __runInitializers(this, _election_id_initializers, void 0));
            this.position = (__runInitializers(this, _election_id_extraInitializers), __runInitializers(this, _position_initializers, void 0));
            this.position_id = (__runInitializers(this, _position_extraInitializers), __runInitializers(this, _position_id_initializers, void 0));
            this.candidate = (__runInitializers(this, _position_id_extraInitializers), __runInitializers(this, _candidate_initializers, void 0));
            this.candidate_id = (__runInitializers(this, _candidate_extraInitializers), __runInitializers(this, _candidate_id_initializers, void 0));
            this.voter = (__runInitializers(this, _candidate_id_extraInitializers), __runInitializers(this, _voter_initializers, void 0));
            this.voter_id = (__runInitializers(this, _voter_extraInitializers), __runInitializers(this, _voter_id_initializers, void 0));
            this.voted_at = (__runInitializers(this, _voter_id_extraInitializers), __runInitializers(this, _voted_at_initializers, void 0));
            __runInitializers(this, _voted_at_extraInitializers);
        }
        return Vote_1;
    }());
    __setFunctionName(_classThis, "Vote");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _election_decorators = [(0, typeorm_1.ManyToOne)(function () { return election_entity_1.Election; }), (0, typeorm_1.JoinColumn)({ name: 'election_id' })];
        _election_id_decorators = [(0, typeorm_1.Column)()];
        _position_decorators = [(0, typeorm_1.ManyToOne)(function () { return position_entity_1.Position; }), (0, typeorm_1.JoinColumn)({ name: 'position_id' })];
        _position_id_decorators = [(0, typeorm_1.Column)()];
        _candidate_decorators = [(0, typeorm_1.ManyToOne)(function () { return candidate_entity_1.Candidate; }), (0, typeorm_1.JoinColumn)({ name: 'candidate_id' })];
        _candidate_id_decorators = [(0, typeorm_1.Column)()];
        _voter_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'voter_id' })];
        _voter_id_decorators = [(0, typeorm_1.Column)()];
        _voted_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _election_decorators, { kind: "field", name: "election", static: false, private: false, access: { has: function (obj) { return "election" in obj; }, get: function (obj) { return obj.election; }, set: function (obj, value) { obj.election = value; } }, metadata: _metadata }, _election_initializers, _election_extraInitializers);
        __esDecorate(null, null, _election_id_decorators, { kind: "field", name: "election_id", static: false, private: false, access: { has: function (obj) { return "election_id" in obj; }, get: function (obj) { return obj.election_id; }, set: function (obj, value) { obj.election_id = value; } }, metadata: _metadata }, _election_id_initializers, _election_id_extraInitializers);
        __esDecorate(null, null, _position_decorators, { kind: "field", name: "position", static: false, private: false, access: { has: function (obj) { return "position" in obj; }, get: function (obj) { return obj.position; }, set: function (obj, value) { obj.position = value; } }, metadata: _metadata }, _position_initializers, _position_extraInitializers);
        __esDecorate(null, null, _position_id_decorators, { kind: "field", name: "position_id", static: false, private: false, access: { has: function (obj) { return "position_id" in obj; }, get: function (obj) { return obj.position_id; }, set: function (obj, value) { obj.position_id = value; } }, metadata: _metadata }, _position_id_initializers, _position_id_extraInitializers);
        __esDecorate(null, null, _candidate_decorators, { kind: "field", name: "candidate", static: false, private: false, access: { has: function (obj) { return "candidate" in obj; }, get: function (obj) { return obj.candidate; }, set: function (obj, value) { obj.candidate = value; } }, metadata: _metadata }, _candidate_initializers, _candidate_extraInitializers);
        __esDecorate(null, null, _candidate_id_decorators, { kind: "field", name: "candidate_id", static: false, private: false, access: { has: function (obj) { return "candidate_id" in obj; }, get: function (obj) { return obj.candidate_id; }, set: function (obj, value) { obj.candidate_id = value; } }, metadata: _metadata }, _candidate_id_initializers, _candidate_id_extraInitializers);
        __esDecorate(null, null, _voter_decorators, { kind: "field", name: "voter", static: false, private: false, access: { has: function (obj) { return "voter" in obj; }, get: function (obj) { return obj.voter; }, set: function (obj, value) { obj.voter = value; } }, metadata: _metadata }, _voter_initializers, _voter_extraInitializers);
        __esDecorate(null, null, _voter_id_decorators, { kind: "field", name: "voter_id", static: false, private: false, access: { has: function (obj) { return "voter_id" in obj; }, get: function (obj) { return obj.voter_id; }, set: function (obj, value) { obj.voter_id = value; } }, metadata: _metadata }, _voter_id_initializers, _voter_id_extraInitializers);
        __esDecorate(null, null, _voted_at_decorators, { kind: "field", name: "voted_at", static: false, private: false, access: { has: function (obj) { return "voted_at" in obj; }, get: function (obj) { return obj.voted_at; }, set: function (obj, value) { obj.voted_at = value; } }, metadata: _metadata }, _voted_at_initializers, _voted_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Vote = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Vote = _classThis;
}();
exports.Vote = Vote;
