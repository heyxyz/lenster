import { Button } from '@components/UI/Button';
import { LensterPublication } from '@generated/lenstertypes';
import { ExclamationCircleIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import React, { FC } from 'react';
import { useGlobalModalStateStore } from 'src/store/modals';

interface Props {
  publication: LensterPublication;
}

const ModAction: FC<Props> = ({ publication }) => {
  const setShowReportModal = useGlobalModalStateStore((state) => state.setShowReportModal);

  return (
    <span className="flex items-center gap-3">
      <Button
        onClick={(event) => {
          event.stopPropagation();
          setShowReportModal(true, publication, { type: 'spamReason', subReason: 'FAKE_ENGAGEMENT' });
        }}
        variant="warning"
        icon={<ExclamationCircleIcon className="h-4 w-4" />}
        className="text-sm mt-3"
        outline
      >
        Spam
      </Button>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          setShowReportModal(true, publication);
        }}
        icon={<ShieldCheckIcon className="h-4 w-4" />}
        className="text-sm mt-3"
      >
        Others
      </Button>
    </span>
  );
};

export default ModAction;
