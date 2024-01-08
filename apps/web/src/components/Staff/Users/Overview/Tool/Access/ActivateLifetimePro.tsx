import type { FC } from 'react';

import { HEY_API_URL } from '@hey/data/constants';
import { Toggle } from '@hey/ui';
import getAuthWorkerHeaders from '@lib/getAuthWorkerHeaders';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import ToggleWrapper from '../ToggleWrapper';

interface ActivateLifetimeProProps {
  isPro: boolean;
  profileId: string;
}

const ActivateLifetimePro: FC<ActivateLifetimeProProps> = ({
  isPro: enabled,
  profileId
}) => {
  const [disabled, setDisabled] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setIsPro(enabled);
  }, [enabled]);

  const updatePro = async () => {
    setDisabled(true);
    toast.promise(
      axios.post(
        `${HEY_API_URL}/internal/pro/activate`,
        { enabled: !isPro, id: profileId, trial: false },
        { headers: getAuthWorkerHeaders() }
      ),
      {
        error: () => {
          setDisabled(false);
          return 'Error updating pro status';
        },
        loading: 'Updating pro status...',
        success: () => {
          setIsPro(!isPro);
          setDisabled(false);
          return 'Pro status updated';
        }
      }
    );
  };

  return (
    <ToggleWrapper title="Activate Lifetime Pro">
      <Toggle disabled={disabled} on={isPro} setOn={updatePro} />
    </ToggleWrapper>
  );
};

export default ActivateLifetimePro;
