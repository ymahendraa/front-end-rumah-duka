import { Permission } from "@/types/authorization";
import { TODO } from "@/types/todo";
import { groupingPermission } from "@/utils/groupingPermission";
import { useMemo } from "react";

const useGroupPermissions = (object: Permission[]) => {
  return useMemo(() => {
    if (object.length === 0) return {};
    const groupedPermission: TODO = groupingPermission(object);
    return groupedPermission;
  }, [object]);
};

export default useGroupPermissions;
