import { Trans } from '@lingui/macro';
import type { FC } from 'react';
import { Card } from 'web-ui';

interface Props {
  type?: string;
}

const HiddenPublication: FC<Props> = ({ type = 'Publication' }) => {
  return (
    <Card className="!bg-gray-100 dark:!bg-gray-800">
      <div className="py-3 px-4 text-sm">
        <Trans>{type} was hidden by the author</Trans>
      </div>
    </Card>
  );
};

export default HiddenPublication;
