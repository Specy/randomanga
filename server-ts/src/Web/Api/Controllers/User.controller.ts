import { UserMapper } from 'Config/Mappers/User.mapper';
import { IUserService } from 'Core/Ports/IUser.service';
import { BaseHttpController } from 'Web/Lib/BaseHttp.controller';
import { Request, Response } from 'express';
import {
  IdentityResponseDto,
  UserTokensResponse,
} from 'Core/Dtos/User/User.dtos';
import { IUserModel } from 'Data/Models/User.model';

export interface IUserControllerOptions {
  userService: IUserService;
}
export class UserController extends BaseHttpController {
  private readonly _userService: IUserService;
  constructor({ userService }: IUserControllerOptions) {
    super();
    this._userService = userService;
  }
  async alIdentityToken(req: Request, res: Response) {
    const data = UserMapper.toCreateAlIdentityRequestDto({ user: req.user! });
    const identity = await this._userService.createAlIdentity(data);
    this.toJson<IdentityResponseDto>(res, { data: identity });
  }
  async authorizeAniList(req: Request, res: Response) {
    if (req.query.error) res.redirect('http://192.168.188.20:3000/');
    const data = UserMapper.toUpdateALTokenRequestDto({
      code: String(req.query.code),
      user: req.user!,
    });
    await this._userService.updateToken(data);
    res.redirect('http://192.168.188.20:3000/settings');
  }
  async show(req: Request, res: Response) {
    const dto = UserMapper.toShowDto({ id: req.params.id! });
    const data = await this._userService.show(dto);
    const response = UserMapper.toWeb(data);
    this.toJson<IUserModel>(res, { statusCode: 200, data: response });
  }
  async token(req: Request, res: Response) {
    const response = UserMapper.toUserTokensResponse(req.user!);
    this.toJson<UserTokensResponse>(res, { statusCode: 200, data: response });
  }
  async update(req: Request, res: Response) {}
  async updateAvatar(req: Request, res: Response) {}
}
