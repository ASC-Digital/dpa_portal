import { uploadFile } from "@/services/Storage";
import { toastrMessage } from "@/utils/Toastr";

export default function useStorage() {
  async function uploadData(file) {
    let data = new FormData();
    data.append("file", file);

    const response = await uploadFile(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.photoUrl;
  }

  return { uploadData };
}
