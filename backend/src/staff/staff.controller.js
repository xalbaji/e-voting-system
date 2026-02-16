"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var StaffController = function () {
    var _classDecorators = [(0, common_1.Controller)('staff'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'))];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getDashboard_decorators;
    var _getVoterRequests_decorators;
    var _getVoters_decorators;
    var _approveVoter_decorators;
    var _rejectVoter_decorators;
    var _getAllElections_decorators;
    var _getElectionsWithStats_decorators;
    var _getCompletedElections_decorators;
    var _getElectionReport_decorators;
    var _getRecentActivities_decorators;
    var StaffController = _classThis = /** @class */ (function () {
        function StaffController_1(staffService) {
            this.staffService = (__runInitializers(this, _instanceExtraInitializers), staffService);
        }
        // Dashboard
        StaffController_1.prototype.getDashboard = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Check if user is staff or admin
                    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
                        throw new common_1.HttpException('Unauthorized - Staff access only', common_1.HttpStatus.FORBIDDEN);
                    }
                    return [2 /*return*/, this.staffService.getDashboardStats()];
                });
            });
        };
        // Voter Management
        StaffController_1.prototype.getVoterRequests = function (limit, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
                        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
                    }
                    return [2 /*return*/, this.staffService.getVoterRequests(limit ? parseInt(limit) : 10)];
                });
            });
        };
        StaffController_1.prototype.getVoters = function (search, status, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
                        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
                    }
                    return [2 /*return*/, this.staffService.getVoters(search || '', status || 'all')];
                });
            });
        };
        StaffController_1.prototype.approveVoter = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                var ipAddress;
                return __generator(this, function (_a) {
                    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
                        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
                    }
                    ipAddress = req.ip || req.connection.remoteAddress;
                    return [2 /*return*/, this.staffService.approveVoter(parseInt(id), req.user.id, req.user.email, ipAddress)];
                });
            });
        };
        StaffController_1.prototype.rejectVoter = function (id, body, req) {
            return __awaiter(this, void 0, void 0, function () {
                var ipAddress;
                return __generator(this, function (_a) {
                    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
                        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
                    }
                    ipAddress = req.ip || req.connection.remoteAddress;
                    return [2 /*return*/, this.staffService.rejectVoter(parseInt(id), body.reason || 'No reason provided', req.user.id, req.user.email, ipAddress)];
                });
            });
        };
        // Election Monitoring
        StaffController_1.prototype.getAllElections = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
                        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
                    }
                    return [2 /*return*/, this.staffService.getAllElections()];
                });
            });
        };
        StaffController_1.prototype.getElectionsWithStats = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
                        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
                    }
                    return [2 /*return*/, this.staffService.getElectionsWithStats()];
                });
            });
        };
        // Reports
        StaffController_1.prototype.getCompletedElections = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
                        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
                    }
                    return [2 /*return*/, this.staffService.getCompletedElections()];
                });
            });
        };
        StaffController_1.prototype.getElectionReport = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
                        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
                    }
                    return [2 /*return*/, this.staffService.getElectionReport(parseInt(id))];
                });
            });
        };
        // Recent Activities
        StaffController_1.prototype.getRecentActivities = function (limit, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
                        throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
                    }
                    return [2 /*return*/, this.staffService.getRecentActivities(limit ? parseInt(limit) : 10)];
                });
            });
        };
        return StaffController_1;
    }());
    __setFunctionName(_classThis, "StaffController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getDashboard_decorators = [(0, common_1.Get)('dashboard')];
        _getVoterRequests_decorators = [(0, common_1.Get)('voter-requests')];
        _getVoters_decorators = [(0, common_1.Get)('voters')];
        _approveVoter_decorators = [(0, common_1.Post)('voters/:id/approve')];
        _rejectVoter_decorators = [(0, common_1.Post)('voters/:id/reject')];
        _getAllElections_decorators = [(0, common_1.Get)('elections')];
        _getElectionsWithStats_decorators = [(0, common_1.Get)('elections-with-stats')];
        _getCompletedElections_decorators = [(0, common_1.Get)('completed-elections')];
        _getElectionReport_decorators = [(0, common_1.Get)('election-report/:id')];
        _getRecentActivities_decorators = [(0, common_1.Get)('recent-activities')];
        __esDecorate(_classThis, null, _getDashboard_decorators, { kind: "method", name: "getDashboard", static: false, private: false, access: { has: function (obj) { return "getDashboard" in obj; }, get: function (obj) { return obj.getDashboard; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getVoterRequests_decorators, { kind: "method", name: "getVoterRequests", static: false, private: false, access: { has: function (obj) { return "getVoterRequests" in obj; }, get: function (obj) { return obj.getVoterRequests; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getVoters_decorators, { kind: "method", name: "getVoters", static: false, private: false, access: { has: function (obj) { return "getVoters" in obj; }, get: function (obj) { return obj.getVoters; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approveVoter_decorators, { kind: "method", name: "approveVoter", static: false, private: false, access: { has: function (obj) { return "approveVoter" in obj; }, get: function (obj) { return obj.approveVoter; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _rejectVoter_decorators, { kind: "method", name: "rejectVoter", static: false, private: false, access: { has: function (obj) { return "rejectVoter" in obj; }, get: function (obj) { return obj.rejectVoter; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllElections_decorators, { kind: "method", name: "getAllElections", static: false, private: false, access: { has: function (obj) { return "getAllElections" in obj; }, get: function (obj) { return obj.getAllElections; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getElectionsWithStats_decorators, { kind: "method", name: "getElectionsWithStats", static: false, private: false, access: { has: function (obj) { return "getElectionsWithStats" in obj; }, get: function (obj) { return obj.getElectionsWithStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCompletedElections_decorators, { kind: "method", name: "getCompletedElections", static: false, private: false, access: { has: function (obj) { return "getCompletedElections" in obj; }, get: function (obj) { return obj.getCompletedElections; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getElectionReport_decorators, { kind: "method", name: "getElectionReport", static: false, private: false, access: { has: function (obj) { return "getElectionReport" in obj; }, get: function (obj) { return obj.getElectionReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRecentActivities_decorators, { kind: "method", name: "getRecentActivities", static: false, private: false, access: { has: function (obj) { return "getRecentActivities" in obj; }, get: function (obj) { return obj.getRecentActivities; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffController = _classThis;
}();
exports.StaffController = StaffController;
