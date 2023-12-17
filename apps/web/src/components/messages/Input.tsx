import {
  FaceSmileIcon,
  PaperAirplaneIcon,
  PaperClipIcon
} from '@heroicons/react/20/solid';
import { useState } from 'react';

const ChatMessageInput = ({
  disabled,
  onSend
}: {
  disabled?: boolean;
  onSend: (message: string) => void;
}) => {
  const [message, setMessage] = useState('');
  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center px-2 ring-2 focus-within:ring-2 focus-within:ring-[#EF4444]">
          <div id="mainIcons">
            <div className="flex items-center space-x-4">
              <button
                className="flex h-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                type="button"
              >
                <PaperClipIcon aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Attach a file</span>
              </button>
              <button
                className="flex h-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                type="button"
              >
                <FaceSmileIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0"
                />
              </button>
            </div>
          </div>
          <textarea
            autoFocus={true}
            className=" block w-full resize-none border-0 bg-transparent py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            defaultValue={''}
            disabled={disabled}
            id="message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows={1}
          />
          <button
            className="flex h-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
            onClick={() => onSend(message)}
            type="button"
          >
            <PaperAirplaneIcon
              aria-hidden="true"
              className="h-5 w-5 flex-shrink-0 text-[#EF4444]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageInput;
