import type { IMessageIPFS } from '@pushprotocol/restapi';
import type { ReactNode } from 'react';

import { ArrowUturnLeftIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { MessageType } from '@pushprotocol/restapi/src/lib/constants';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import usePushHooks from 'src/hooks/messaging/push/usePush';
import useProfileStore from 'src/store/persisted/useProfileStore';
import { usePushChatStore } from 'src/store/persisted/usePushChatStore';

import type { MessageReactions } from './Reactions';

import Attachment from './Attachment';
import { dateToFromNowDaily, getProfileIdFromDID } from './helper';
import { DisplayReactions, Reactions } from './Reactions';

interface Props {
  message: IMessageIPFS;
  messageReactions: [] | MessageReactions[];
  replyMessage: IMessageIPFS | null;
}

interface ChatAction {
  children: ReactNode;
  onClick: () => void;
  showAction: boolean;
}

enum MessageOrigin {
  Receiver = 'receiver',
  Sender = 'sender'
}

const ChatAction: React.FC<ChatAction> = ({
  children,
  onClick,
  showAction
}) => (
  <motion.div
    animate={{ opacity: showAction ? 1 : 0 }}
    className="border-brand-400 ml-4 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border"
    initial={{ opacity: 1 }}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

interface MessageWrapperProps {
  children: ReactNode;
  isAttachment: boolean;
  messageOrigin: MessageOrigin;
}

const MessageWrapper: React.FC<MessageWrapperProps> = ({
  children,
  isAttachment,
  messageOrigin
}) => {
  return (
    <div
      className={clsx('relative w-fit max-w-fit font-medium', {
        'border py-3 pl-4 pr-[50px]': !isAttachment,
        'rounded-xl rounded-tl-sm': messageOrigin === MessageOrigin.Sender,
        'rounded-xl rounded-tr-sm bg-violet-500':
          messageOrigin === MessageOrigin.Receiver
      })}
    >
      {children}
    </div>
  );
};

interface TimestampProps {
  timestamp: number;
}

const TimeStamp: React.FC<TimestampProps> = ({ timestamp }) => {
  const timestampDate = dateToFromNowDaily(timestamp);
  return <p className="text-xs text-gray-500">{timestampDate}</p>;
};

interface MessageCardProps {
  chat: IMessageIPFS;
  className: string;
}

const MessageCard: React.FC<MessageCardProps> = ({ chat, className }) => {
  return <p className={className}>{chat.messageContent}</p>;
};

interface ReplyCardProps {
  chat: IMessageIPFS;
  handle: string;
}

const ReplyMessage: React.FC<ReplyCardProps> = ({ chat, handle }) => {
  return (
    <div className="relative flex flex-row overflow-hidden rounded-lg bg-gray-300 p-4">
      <div className="bg-brand-500 absolute left-0 top-0 h-full w-1.5" />
      <div className="flex flex-col">
        <span className="text-brand-500 font-medium">{handle}</span>
        <span className="text-sm">{chat.messageContent}</span>
      </div>
    </div>
  );
};

const Message = ({ message, messageReactions, replyMessage }: Props) => {
  const [showChatActions, setShowChatActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const currentProfile = useProfileStore((state) => state.currentProfile);
  const recipientProfile = usePushChatStore((state) => state.recipientProfile);
  const reactionRef = useRef<HTMLDivElement | null>(null);
  const { useSendMessage } = usePushHooks();
  const { setReplyToMessage } = usePushChatStore();
  const { mutateAsync: sendMessage } = useSendMessage();

  const handleMouseEnter = () => {
    setShowChatActions(true);
  };

  const handleMouseLeave = () => {
    setShowChatActions(false);
  };

  const messageOrigin =
    getProfileIdFromDID(message.fromDID) !== currentProfile?.id
      ? MessageOrigin.Sender
      : MessageOrigin.Receiver;

  return (
    <div
      className={clsx('flex items-center', {
        'flex-row-reverse': messageOrigin === MessageOrigin.Receiver
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={clsx('flex-col', {
          'self-end': messageOrigin === MessageOrigin.Sender
        })}
      >
        <MessageWrapper
          isAttachment={message.messageType !== 'Text'}
          messageOrigin={messageOrigin}
        >
          {message.messageType === 'Text' ? (
            <MessageCard
              chat={message}
              className={clsx(
                messageOrigin === MessageOrigin.Receiver ? 'text-white' : '',
                'max-w-[100%] break-words text-sm'
              )}
            />
          ) : (
            <Attachment message={message} />
          )}
        </MessageWrapper>
        <DisplayReactions MessageReactions={messageReactions} />
        <TimeStamp timestamp={message?.timestamp!} />
      </div>
      <div className="mr-3 mt-[-20px] flex">
        <ChatAction
          onClick={() => {
            setReplyToMessage(message);
          }}
          showAction={showChatActions}
        >
          <ArrowUturnLeftIcon
            className="text-brand-500 h-3 w-3"
            strokeWidth={2}
          />
        </ChatAction>
        <div ref={reactionRef}>
          <ChatAction
            onClick={() => {
              setShowReactions(true);
              setShowChatActions(false);
            }}
            showAction={showChatActions}
          >
            <FaceSmileIcon className={'text-brand-500 h-4 w-4'} />
          </ChatAction>
        </div>
        <div className="ml-2">
          {showReactions ? (
            <Reactions
              onClick={() => {
                setShowReactions(false);
                setShowChatActions(true);
              }}
              onValue={(value) => {
                sendMessage({
                  content: {
                    content: value,
                    type: MessageType.TEXT
                  },
                  reference: message.link!,
                  type: MessageType.REACTION
                });
                setShowReactions(false);
                setShowChatActions(true);
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Message;
