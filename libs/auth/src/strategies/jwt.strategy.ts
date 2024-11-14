import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ICurrentUser } from "../interfaces";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService 
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), /* (достанет  токен из запроса) */
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET")
        });
    }

    async validate(payload: ICurrentUser): Promise<ICurrentUser> { /* (проверяем пользователя - payload-ом будет полученная из токена информация) */
        const user = await this.authService.validateUser(payload.email);
        if(!user) {
            throw new UnauthorizedException(
                `User by email "${payload.email}" not found!`
            )
        }
        return payload;
    }
} /* (подключаем через индекс в auth.module.ts) */