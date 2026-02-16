"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const staff_service_1 = require("./staff.service");
let StaffController = class StaffController {
    staffService;
    constructor(staffService) {
        this.staffService = staffService;
    }
    async getDashboard(req) {
        if (req.user.role !== 'staff' && req.user.role !== 'admin') {
            throw new common_1.HttpException('Unauthorized - Staff access only', common_1.HttpStatus.FORBIDDEN);
        }
        return this.staffService.getDashboardStats();
    }
    async getVoterRequests(limit, req) {
        if (req.user.role !== 'staff' && req.user.role !== 'admin') {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        return this.staffService.getVoterRequests(limit ? parseInt(limit) : 10);
    }
    async getVoters(search, status, req) {
        if (req.user.role !== 'staff' && req.user.role !== 'admin') {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        return this.staffService.getVoters(search || '', status || 'all');
    }
    async approveVoter(id, req) {
        if (req.user.role !== 'staff' && req.user.role !== 'admin') {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        const ipAddress = req.ip || req.connection.remoteAddress;
        return this.staffService.approveVoter(parseInt(id), req.user.id, req.user.email, ipAddress);
    }
    async rejectVoter(id, body, req) {
        if (req.user.role !== 'staff' && req.user.role !== 'admin') {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        const ipAddress = req.ip || req.connection.remoteAddress;
        return this.staffService.rejectVoter(parseInt(id), body.reason || 'No reason provided', req.user.id, req.user.email, ipAddress);
    }
    async getAllElections(req) {
        if (req.user.role !== 'staff' && req.user.role !== 'admin') {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        return this.staffService.getAllElections();
    }
    async getElectionsWithStats(req) {
        if (req.user.role !== 'staff' && req.user.role !== 'admin') {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        return this.staffService.getElectionsWithStats();
    }
    async getCompletedElections(req) {
        if (req.user.role !== 'staff' && req.user.role !== 'admin') {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        return this.staffService.getCompletedElections();
    }
    async getElectionReport(id, req) {
        if (req.user.role !== 'staff' && req.user.role !== 'admin') {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        return this.staffService.getElectionReport(parseInt(id));
    }
    async getRecentActivities(limit, req) {
        if (req.user.role !== 'staff' && req.user.role !== 'admin') {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.FORBIDDEN);
        }
        return this.staffService.getRecentActivities(limit ? parseInt(limit) : 10);
    }
};
exports.StaffController = StaffController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('voter-requests'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getVoterRequests", null);
__decorate([
    (0, common_1.Get)('voters'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getVoters", null);
__decorate([
    (0, common_1.Post)('voters/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "approveVoter", null);
__decorate([
    (0, common_1.Post)('voters/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "rejectVoter", null);
__decorate([
    (0, common_1.Get)('elections'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getAllElections", null);
__decorate([
    (0, common_1.Get)('elections-with-stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getElectionsWithStats", null);
__decorate([
    (0, common_1.Get)('completed-elections'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getCompletedElections", null);
__decorate([
    (0, common_1.Get)('election-report/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getElectionReport", null);
__decorate([
    (0, common_1.Get)('recent-activities'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getRecentActivities", null);
exports.StaffController = StaffController = __decorate([
    (0, common_1.Controller)('staff'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffController);
//# sourceMappingURL=staff.controller.js.map