import {
  getUserProfile,
  updateUserProfile,
  getUserWallet,
  getUserTransactions,
  getUserDashboard,
  getUserReports,
} from "@/services/Profile";
import { useAuth } from "@/contexts/Authentication";
import { updateToken } from "@/utils/Token";
import { toastrMessage } from "@/utils/Toastr";
import { getToken } from "@/utils/Token";

export default function useProfile() {
  const { user, setUser } = useAuth();

  async function getProfile(token) {
    const response = await getUserProfile(token);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.profileUser.sort((a, b) => b.id - a.id);
  }

  async function updateProfile(body) {
    const response = await updateUserProfile(body);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    const updateTokenResponse = await updateToken({
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      document: body.document,
      photoUrl: body.photoUrl ? body.photoUrl : user.photoUrl,
      roleId: body.roleId,
      balance: user.balance,
      fullName: body?.fullName,
    });

    if (!updateTokenResponse.status) {
      toastrMessage("error", updateTokenResponse.message);
      return;
    }

    setUser({
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      document: body.document,
      photoUrl: body.photoUrl,
      roleId: body.roleId,
      balance: user.balance,
      permissions: user.permissions,
      fullName: body?.fullName,
    });

    toastrMessage("success", "Usuário alterado com sucesso!");
  }

  async function getProfileWallet(token) {
    const response = await getUserWallet(token);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.wallet;
  }

  async function getProfileTransactions(userId) {
    const response = await getUserTransactions(userId);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.transactions.sort((a, b) => b.id - a.id);
  }

  async function getProfileDashboard() {
    const response = await getUserDashboard();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.dashboard;
  }

  async function updateWallet() {
    const response = await getUserWallet(getToken("token"));

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    const updateTokenResponse = await updateToken({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      document: user.document,
      photoUrl: user.photoUrl,
      roleId: user.roleId,
      permissions: user.permissions,
      balance: response.wallet.balance,
      fullName: user?.fullName,
    });

    if (!updateTokenResponse.status) {
      toastrMessage("error", updateTokenResponse.message);
      return;
    }

    setUser({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      document: user.document,
      photoUrl: user.photoUrl,
      roleId: user.roleId,
      balance: response.wallet.balance,
      permissions: user.permissions,
      fullName: user?.fullName,
    });
  }

  async function getProfileReports(queryString) {
    let params = "";

    if (queryString) {
      params = queryString;
    }

    const response = await getUserReports(params);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.reports;
  }

  return {
    getProfile,
    updateProfile,
    getProfileWallet,
    getProfileTransactions,
    getProfileDashboard,
    updateWallet,
    getProfileReports,
  };
}
