import toastr from "toastr";
import "./styles.css";

/**
 * Settings
 */
toastr.options = {
  closeButton: true,
  preventDuplicates: true,
  progressBar: false,
  showDuration: "5000",
  hideDuration: "5000",
};

/**
 * Function Toastr Message
 * @param {string} status
 * @param {string} message
 */
export function toastrMessage(status, message) {
  return toastr[status](message);
}
