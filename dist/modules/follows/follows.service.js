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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
let FollowsService = class FollowsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createFollowDto, followerId) {
        const userFollower = await this.prisma.user.findUnique({
            where: { id: followerId },
        });
        if (!userFollower) {
            throw (0, http_error_1.HttpError)({ message: 'UserFollower not found' });
        }
        const userFollowing = await this.prisma.user.findUnique({
            where: { id: createFollowDto.followingId },
        });
        if (!userFollowing) {
            throw (0, http_error_1.HttpError)({ message: 'UserFollwing not found' });
        }
        const alreadyFollowed = await this.prisma.follows.findFirst({
            where: {
                followerId: followerId,
                followingId: createFollowDto.followingId,
            },
        });
        if (alreadyFollowed) {
            throw (0, http_error_1.HttpError)({ message: 'You already follow this user' });
        }
        const follows = await this.prisma.follows.create({
            data: { followerId: userFollower.id, followingId: userFollowing.id },
            include: {
                follower: true,
                following: true,
            },
        });
        return follows;
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.follows.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    follower: {},
                    following: {},
                },
            }),
            this.prisma.follows.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const follow = await this.prisma.follows.findUnique({
            where: { id: id },
            include: {
                follower: true,
                following: true,
            },
        });
        if (!follow) {
            throw (0, http_error_1.HttpError)({ message: 'Follows not found' });
        }
        return follow;
    }
    async remove(followerId, followingId) {
        const deleted = await this.prisma.follows.deleteMany({
            where: {
                followerId,
                followingId,
            },
        });
        if (deleted.count === 0) {
            throw (0, http_error_1.HttpError)({ message: 'Follow not found' });
        }
        return { message: 'Unfollowed successfully' };
    }
};
exports.FollowsService = FollowsService;
exports.FollowsService = FollowsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FollowsService);
//# sourceMappingURL=follows.service.js.map