import { SPACES_WORKER_URL } from '@lenster/data/constants';
import getBasicWorkerPayload from '@lib/getBasicWorkerPayload';
import axios from 'axios';
import { useSpacesStore } from 'src/store/spaces';

type CreateSpaceResponse = string;

const useCreateSpace = (): [createPoll: () => Promise<CreateSpaceResponse>] => {
  const {
    isTokenGated,
    tokenGateConditionType,
    tokenGateConditionValue,
    isSpacesTimeInAM,
    spacesTimeInHour,
    spacesTimeInMinute
  } = useSpacesStore();
  let payload = {};
  const now = new Date();
  now.setHours(
    isSpacesTimeInAM ? Number(spacesTimeInHour) : Number(spacesTimeInHour) + 12
  );
  now.setMinutes(Number(spacesTimeInMinute));
  const startTime = now.toISOString();
  const createSpace = async (): Promise<CreateSpaceResponse> => {
    if (isTokenGated) {
      payload = {
        ...getBasicWorkerPayload(),
        conditionType: tokenGateConditionType,
        conditionValue: tokenGateConditionValue,
        isTokenGated: isTokenGated,
        startTime: startTime
      };
    } else {
      payload = {
        ...getBasicWorkerPayload(),
        startTime: startTime
      };
    }
    try {
      const response = await axios({
        url: `${SPACES_WORKER_URL}/createSpace`,
        method: 'POST',
        data: payload
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return [createSpace];
};

export default useCreateSpace;
