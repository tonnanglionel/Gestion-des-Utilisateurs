export interface IUserPasswordChangeModel {
    userId?: number;
    oldPassword?: string;
    newPassword?: string;
  }
  
  export  class  UserPasswordChangeModel implements IUserPasswordChangeModel {
    constructor(
      public userId?: number,
      public oldPassword?: string,
      public newPassword?: string
    ) {}
  }