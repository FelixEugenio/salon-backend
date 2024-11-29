import { UserRepository } from "../repositories/user-repository";
import { CreateUserDto,LoginUserDto,UpdateUserDto,UserResponseDto } from "../dtos/user-dto";
import bcrypt from 'bcryptjs';

export class UserService {
    private userRepository : UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }

    //service para criar usuário
    async create(data: CreateUserDto): Promise<UserResponseDto> {
        
        //verificando se usuário já existe
        const verifyIfUserExists = await this.userRepository.findByEmail(data.email);

        if (verifyIfUserExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await bcrypt.hash(data.password, 8);
        const user = await this.userRepository.create({...data, password: passwordHash});

        return user;
    }
}