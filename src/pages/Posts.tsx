import { WelcomeSection } from '@entities/shared';
import { PostsContainer } from '@features/posts/ui';

const Posts = () => {
  return (
    <div className="container">
      <WelcomeSection
        subtitle="Community stories"
        title="Discover thoughts shared by others"
        description="Explore posts from the community — get inspired by what others write and create your own quotes."
        className="mx-auto sm:w-[90%] md:w-[80%] lg:w-[60%]"
      />
      <PostsContainer />
    </div>
  );
};

export default Posts;
