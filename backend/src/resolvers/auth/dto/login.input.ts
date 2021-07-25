import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
	@Field()
	@IsEmail()
	username: string;

	@Field()
	@IsNotEmpty()
	@MinLength(8)
	password: string;
}
