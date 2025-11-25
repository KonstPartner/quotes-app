import { WelcomeSection } from '@entities/shared';
import { ChatSection } from '@features/chat/ui';

const Chat = () => {
  return (
    <div className="container">
      <WelcomeSection
        subtitle="Inspiration chat"
        title="Talk with yourself"
        description="This chat echoes your messages back to you, helping you reflect on thoughts,
    track ideas, or spark a bit of inspiration."
        className="mx-auto sm:w-[90%] md:w-[80%] lg:w-[60%]"
      />

      <ChatSection />
    </div>
  );
};

export default Chat;
