import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { EncryptorService } from '../encryptor/encryptor.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly encryptorService: EncryptorService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    user.password = await this.encryptorService.encrypt(user.password);
    return await this.userRepository.save(user);
  }

  async update(id: number, user: UpdateUserDto) {
    user.password = await this.encryptorService.encrypt(user.password);
    return await this.userRepository.update(id, user);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
