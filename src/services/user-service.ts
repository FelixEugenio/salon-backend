import { UserRepository } from "../repositories/user-repository";
import { ICreateUserDto,ILoginUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user-dto";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/auth/generate-token";
import { ConflictError, InvalidPasswordError, UserNotFoundError } from "../utils/error/error-types";

export class UserService {
    private userRepository : UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }

    //service para criar usuário
    async create(data: ICreateUserDto): Promise<IUserResponseDto> {

        //verificando se usuário já existe
        const verifyIfUserExists = await this.userRepository.findByEmail(data.email);

        if (verifyIfUserExists) {
            throw new ConflictError("User already exists");
        }

        const passwordHash = await bcrypt.hash(data.password, 8);
        const user = await this.userRepository.create({...data, password: passwordHash});

        return user;
    }

    async profile(userId:string): Promise<IUserResponseDto> {
        return await this.userRepository.profile(userId);
    }

    async login(data:ILoginUserDto){
        const user = await this.userRepository.findByEmail(data.email);
        if(!user){
            throw new UserNotFoundError("User not found");
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if(!isValidPassword){
            throw new InvalidPasswordError("Invalid password");
        }

        const token = await generateToken(user.id,user.role);

        return {token};
    }

    async delete(userId:string){
         return await this.userRepository.delete(userId)
    }

    async update(userId:string,data:IUpdateUserDto):Promise<IUserResponseDto>{
       const user = await this.userRepository.findById(userId)
       if(!user){
        throw new UserNotFoundError("User not found");
       }

       return await this.userRepository.update(userId,data);

    }

    async blockedUser(userId:string):Promise<IUserResponseDto>{
        const user = await this.userRepository.findById(userId)
        if(!user){
            throw new UserNotFoundError("User not found");
        }

        return await this.userRepository.blockUser(userId);
        }

        async unBlockedUser(userId:string):Promise<IUserResponseDto>{
            const user = await this.userRepository.findById(userId)
            if(!user){
                throw new UserNotFoundError("User not found");
            }

            return await this.userRepository.unBlockedUser(userId);
            }

        async getAllUsers():Promise<IUserResponseDto[]>{
            return await this.userRepository.getAllUsers();
        }
}