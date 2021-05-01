import { IUsersRepository } from 'Core/Ports/IUsers.repository';
import UserModel, { IUserModel } from 'Data/Models/User.model';

export class UsersRepository implements IUsersRepository {
  private _model = UserModel;

  public async findOneUser(id: string) {
    return this._model.findOne({ _id: id });
  }
  public async save(data: Omit<IUserModel, '_id' | ' avatar' | 'role'>) {
    const user = new this._model(data);
    const exists = await this._model.findOne({
      $or: [{ username: user.username }, { email: user.email }],
    });
    if (exists) throw new Error('Username or email already taken');
    return user.save();
  }
  public async delete(id: string) {
    const { deletedCount } = await this._model.deleteOne({ _id: id });
    return deletedCount ? deletedCount >= 1 : false;
  }
  public async findOneByUsername(username: string) {
    return UserModel.findOne({ username: username });
  }
  public async saveAnilistAuth(
    data: { access_token: string; refresh_token: string },
    user: IUserModel
  ) {
    const record = await this._model
      .findByIdAndUpdate(
        user._id,
        {
          alAuth: {
            token: data.access_token,
            refreshToken: data.refresh_token,
          },
        },
        { new: true }
      )
      .orFail();
    return record;
  }
}
