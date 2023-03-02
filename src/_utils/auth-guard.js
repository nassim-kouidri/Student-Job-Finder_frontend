import router from "@/router";
import { accountService } from "@/_services";

export function authGuard(to) {
  if (accountService.isLogged()) {
    return true;
  }
  router.push("login");
}

export function authGuardUser(to) {
  if (accountService.getUserInfo()) {
    return true;
  }
  router.push("/");
}
