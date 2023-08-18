import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name: name,
      startDate: startDate,
      endDate: endDate,
      students: students,
    });

    return this.lessonRepository.save(lesson);
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async assignStudentstoLesson(
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;

    const lesson = await this.lessonRepository.findOne({
      where: {
        id: lessonId,
      },
    });

    lesson.students = [...lesson.students, ...studentIds];

    return this.lessonRepository.save(lesson);
  }
}
