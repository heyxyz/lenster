import IndexStatus from "@components/Shared/IndexStatus";
import errorToast from "@helpers/errorToast";
import { Errors } from "@hey/data/errors";
import { Button } from "@hey/ui";
import cn from "@hey/ui/cn";
import type { FC } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAccountStatus } from "src/store/non-persisted/useAccountStatus";
import { useAccountStore } from "src/store/persisted/useAccountStore";

interface ToggleLensManagerProps {
  buttonSize?: "sm";
}

const ToggleLensManager: FC<ToggleLensManagerProps> = ({
  buttonSize = "md"
}) => {
  const { currentAccount } = useAccountStore();
  const { isSuspended } = useAccountStatus();
  const [isLoading, setIsLoading] = useState(false);

  const onError = (error: any) => {
    setIsLoading(false);
    errorToast(error);
  };

  const handleToggleDispatcher = async () => {
    if (isSuspended) {
      return toast.error(Errors.Suspended);
    }

    try {
      setIsLoading(true);
      return await createChangeProfileManagersTypedData({
        variables: {
          request: { approveSignless: !canUseSignless }
        }
      });
    } catch (error) {
      onError(error);
    }
  };

  return writeHash ? (
    <div className="mt-2">
      <IndexStatus shouldReload txHash={writeHash} />
    </div>
  ) : (
    <Button
      className={cn({ "text-sm": buttonSize === "sm" }, "mr-auto")}
      disabled={isLoading}
      onClick={handleToggleDispatcher}
      variant={currentAccount?.isSignless ? "danger" : "primary"}
    >
      {currentAccount?.isSignless ? "Disable" : "Enable"}
    </Button>
  );
};

export default ToggleLensManager;
