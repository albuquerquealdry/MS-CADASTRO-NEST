import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, User } from './entities/user.entity';

const isValidCPF = require('../scripts/cpfvalidity')

@Injectable()
export class UsersService{
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto) {
    const user =  new this.UserModel(createUserDto);
    var cpf = user['cpf']
    var validationCPF= isValidCPF(cpf)
    if (validationCPF == true){
      return user.save();
    } 
  }

  findAll() {
    return this.UserModel.find()
  }
  findOne(id: string) {
  return this.UserModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
      
        $set : updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.UserModel.deleteOne({
      _id: id,
    })
    .exec();
  }
}
