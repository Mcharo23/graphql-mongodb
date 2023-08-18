import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => StudentType)
  gestStudent(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
