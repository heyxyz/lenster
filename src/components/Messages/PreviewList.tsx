import Preview from '@components/Messages/Preview';
import { Card } from '@components/UI/Card';
import { GridItemFour } from '@components/UI/GridLayout';
import { PageLoading } from '@components/UI/PageLoading';
import useMessagePreviews from '@components/utils/hooks/useMessagePreviews';
import { PlusCircleIcon } from '@heroicons/react/outline';
import buildConversationId from '@lib/buildConversationId';
import { buildConversationKey } from '@lib/conversationKey';
import isFeatureEnabled from '@lib/isFeatureEnabled';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import Custom404 from 'src/pages/404';
import Custom500 from 'src/pages/500';
import { useAppStore } from 'src/store/app';

const PreviewList: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const { loading, messages, profiles, profilesError } = useMessagePreviews();
  const router = useRouter();

  if (!isFeatureEnabled('messages', currentProfile?.id)) {
    return <Custom404 />;
  }

  if (profilesError) {
    return <Custom500 />;
  }

  const showLoading = loading && (messages.size === 0 || profiles.size === 0);

  const sortedProfiles = Array.from(profiles).sort(([, a], [, b]) => {
    const conversationIdA = buildConversationId(currentProfile?.id, a.id);
    const conversationKeyA = buildConversationKey(a.ownedBy, conversationIdA);
    const conversationIdB = buildConversationId(currentProfile?.id, b.id);
    const conversationKeyB = buildConversationKey(b.ownedBy, conversationIdB);
    const messageA = messages.get(conversationKeyA);
    const messageB = messages.get(conversationKeyB);
    return (messageA?.sent?.getTime() || 0) >= (messageB?.sent?.getTime() || 0) ? -1 : 1;
  });

  const newMessageClick = () => {
    router.push('/messages');
  };

  return (
    <GridItemFour>
      <Card className="h-[86vh]">
        <div className="flex justify-between items-center p-5 border-b">
          <div className="font-bold">Messages</div>
          <button onClick={newMessageClick} type="button">
            <PlusCircleIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-2">
          {showLoading ? (
            <PageLoading message="Loading conversations" />
          ) : (
            sortedProfiles.map(([key, profile]) => {
              const message = messages.get(key);
              if (!message) {
                return null;
              }

              return <Preview key={key} profile={profile} conversationKey={key} message={message} />;
            })
          )}
        </div>
      </Card>
    </GridItemFour>
  );
};

export default PreviewList;
