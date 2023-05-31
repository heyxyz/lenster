import FingerprintJS from '@fingerprintjs/fingerprintjs';
import type { FC } from 'react';
import { useFingerprintStore } from 'src/store/fingerprint';
import { useUpdateEffect } from 'usehooks-ts';

const LeafwatchProvider: FC = () => {
  const setFingerprint = useFingerprintStore((state) => state.setFingerprint);

  const saveFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    setFingerprint(visitorId);
  };

  useUpdateEffect(() => {
    saveFingerprint();
  }, []);
  return null;
};

export default LeafwatchProvider;
