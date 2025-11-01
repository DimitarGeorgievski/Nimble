import { useMenuStore } from "./useMenuStore";
import { useOrdersStore } from "./useOrdersStore";
import { useTablesStore } from "./useTablesStore";
import { useUserStore } from "./useUserStore";

export const useStores = () => ({
    user: useUserStore(),
    orders: useOrdersStore(),
    tables: useTablesStore(),
    menu: useMenuStore()
})