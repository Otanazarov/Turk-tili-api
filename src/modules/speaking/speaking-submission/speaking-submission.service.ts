import { Injectable, Logger } from '@nestjs/common';
import { CreateSpeakingSubmissionDto } from './dto/create-speaking-submission.dto';
import { UpdateSpeakingSubmissionDto } from './dto/update-speaking-submisson.dto';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllSpeakingSubmissionDto } from './dto/findAll-speaking.submission.dto';
import { OpenAIService } from '../../openAI/openAI.service';
import { FileService } from '../../file/file.service';
import { SpeakingQuestion, SpeakingSubmissionAnswer } from '@prisma/client';

@Injectable()
export class SpeakingSubmissionService {
  private readonly logger = new Logger(SpeakingSubmissionService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly openAIService: OpenAIService,
    private readonly fileService: FileService,
  ) {}

  async speechToText(files: Array<Express.Multer.File>) {
    return await this.openAIService.speechToText(files[0].buffer);
  }

  async create(
    dto: CreateSpeakingSubmissionDto,
    files: Array<Express.Multer.File>,
    userId: string,
  ) {
    const speakingTest = await this.prisma.speakingTest.findUnique({
      where: { id: dto.speakingTestId },
    });
    if (!speakingTest) {
      throw new HttpError({ message: 'Speaking test not found' });
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new HttpError({ message: 'User not found' });
    }

    const filesByQuestionId = new Map<string, Express.Multer.File>();
    for (const file of files) {
      filesByQuestionId.set(file.fieldname, file);
    }

    const answersToCreate = await Promise.all(
      dto.answers.map(async (answer) => {
        const audioFile = filesByQuestionId.get(answer.questionId);
        if (!audioFile) {
          throw new HttpError({
            message: `Audio file for question ${answer.questionId} not provided.`,
          });
        }

        const savedFile = await this.fileService.saveFile(
          audioFile,
          `speaking-submission/${userId}`,
        );
        const audioToText = await this.openAIService.speechToText(
          audioFile.buffer,
        );

        return {
          questionId: answer.questionId,
          audioUrl: savedFile.url,
          text: audioToText,
        };
      }),
    );

    const submission = await this.prisma.speakingSubmission.create({
      data: {
        speakingTestId: dto.speakingTestId,
        userId: userId,
        answers: {
          create: answersToCreate,
        },
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    // Don't await, let it run in the background
    this.scoreSubmission(submission.id, submission.answers);

    return submission;
  }

  async scoreSubmission(
    submissionId: string,
    answers: (SpeakingSubmissionAnswer & { question: SpeakingQuestion })[],
  ): Promise<void> {
    this.logger.log(`Starting to score submission ${submissionId}`);
    try {
      const questionsAndAnswers = answers.map((ans) => ({
        question: ans.question.questionText,
        answer: ans.text,
      }));

      if (questionsAndAnswers.length === 0) {
        this.logger.warn(`No answers to score for submission ${submissionId}`);
        return;
      }

      const assessment =
        await this.openAIService.getSpeakingAssessment(questionsAndAnswers);

      await this.prisma.speakingSubmission.update({
        where: { id: submissionId },
        data: {
          score: assessment.score,
          aiFeedback: assessment.feedback,
        },
      });
      this.logger.log(`Successfully scored submission ${submissionId}`);
    } catch (error) {
      this.logger.error(
        `Failed to score submission ${submissionId}`,
        error.stack,
      );
    }
  }

  async findAll(dto: FindAllSpeakingSubmissionDto) {
    const { limit = 10, page = 1 } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.speakingSubmission.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          speakingTest: true,
        },
      }),
      this.prisma.speakingSubmission.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const submission = await this.prisma.speakingSubmission.findUnique({
      where: { id },
      include: {
        user: true,
        speakingTest: true,
        answers: {
          include: {
            question: true,
          },
        },
      },
    });
    if (!submission) {
      throw new HttpError({ message: 'Speaking submission not found' });
    }
    return submission;
  }

  async update(id: string, dto: UpdateSpeakingSubmissionDto) {
    const submission = await this.prisma.speakingSubmission.findUnique({
      where: { id },
    });
    if (!submission) {
      throw new HttpError({ message: 'Speaking submission not found' });
    }

    return this.prisma.speakingSubmission.update({
      where: { id },
      data: {
        score: dto.score,
      },
    });
  }

  async remove(id: string) {
    const submission = await this.prisma.speakingSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      throw new HttpError({
        message: 'Speaking submission not found',
        statusCode: 404,
      });
    }

    // TODO: Delete associated audio files from storage
    return this.prisma.speakingSubmission.delete({
      where: { id },
    });
  }
}
