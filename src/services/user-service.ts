import { UserRepository } from "../repositories/user-repository";
import { CreateUserDto,LoginUserDto,UpdateUserDto,UserResponseDto } from "../dtos/user-dto";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/auth/generate-token";

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

    async profile(userId:string): Promise<UserResponseDto> {
        return await this.userRepository.profile(userId);
    }

    async login(data:LoginUserDto){
        const user = await this.userRepository.findByEmail(data.email);
        if(!user){
            throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if(!isValidPassword){
            throw new Error("Invalid password");
        }

        const token = await generateToken(user.id);

        return {token};
    }
}