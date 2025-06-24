import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllFollowDto } from './dto/findAll-follow.dto';

@Injectable()
export class FollowsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFollowDto: CreateFollowDto, followerId: string) {
    const userFollower = await this.prisma.user.findUnique({
      where: { id: followerId },
    });
    if (!userFollower) {
      throw HttpError({ message: 'UserFollower not found' });
    }

    const userFollowing = await this.prisma.user.findUnique({
      where: { id: createFollowDto.followingId },
    });
    if (!userFollowing) {
      throw HttpError({ message: 'UserFollwing not found' });
    }
    const alreadyFollowed = await this.prisma.follows.findFirst({
      where: {
        followerId: followerId,
        followingId: createFollowDto.followingId,
      },
    });

    if (alreadyFollowed) {
      throw HttpError({ message: 'You already follow this user' });
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

  async findAll(dto: FindAllFollowDto) {
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

  async findOne(id: string) {
    const follow = await this.prisma.follows.findUnique({
      where: { id: id },
      include: {
        follower: true,
        following: true,
      },
    });
    if (!follow) {
      throw HttpError({ message: 'Follows not found' });
    }
    return follow;
  }

  async remove(followerId: string, followingId: string) {
    const deleted = await this.prisma.follows.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });
  
    if (deleted.count === 0) {
      throw HttpError({ message: 'Follow not found' });
    }
  
    return { message: 'Unfollowed successfully' };
  }
  
}
