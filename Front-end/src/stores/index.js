import { createPinia } from "pinia";
import { useUserStore } from "./user";
import { useProfileStore } from "./profile";
import { useGeneralStore } from "./general";
export const pinia = createPinia();
export function usePinia(app) {
  app.use(pinia);
}
export const userStore = useUserStore(pinia);
export const profileStore = useProfileStore(pinia);
export const generalStore = useGeneralStore(pinia);
