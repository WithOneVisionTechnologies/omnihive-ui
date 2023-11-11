import { CloudinaryFolders } from "@/lib/enums/CloudinaryFoldersEnum";
import { IsHelper } from "@/lib/helpers/IsHelper";

export class ImageHelper {
   public static getCloudinaryRoot(folder: CloudinaryFolders, width?: number): string {
      return `https://res.cloudinary.com/drmwm8u2c/image/upload/${
         !IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(width) ? `c_scale,w_${width}` : ``
      }/${folder}`;
   }
}
