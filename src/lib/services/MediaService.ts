import { CloudinaryFolders } from "../enums/CloudinaryFoldersEnum";
import { IsHelper } from "../helpers/IsHelper";

export class MediaService {
   public getCloudinaryRoot(folder: CloudinaryFolders, width?: number): string {
      return `https://res.cloudinary.com/drmwm8u2c/image/upload/${
         !IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(width) ? `c_scale,w_${width}` : ``
      }/${folder}`;
   }
}
