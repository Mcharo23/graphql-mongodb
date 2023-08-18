import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { In, Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentrepository: Repository<Student>,
  ) {}

  async getStudent(id: string): Promise<Student> {
    const student = await this.studentrepository.findOne({
      where: {
        id: id,
      },
    });

    return student;
  }

  async getStudents(): Promise<Student[]> {
    return this.studentrepository.find();
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = await this.studentrepository.create({
      id: uuid(),
      firstName: firstName,
      lastName: lastName,
    });

    return this.studentrepository.save(student);
  }

  async getManyStudents(studentIDs: string[]): Promise<Student[]> {
    return await this.studentrepository.find({
      where: {
        id: { $in: studentIDs } as any,
      },
    });
  }
}
