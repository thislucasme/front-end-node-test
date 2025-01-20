import { Box, Button, Flex, Image, Input, Progress, Spacer, Text, Textarea, VStack } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Logout } from '../componets/Logout';
import { PostContext } from '../contexts/PostContext';
import api from '../services/api';
import { Empty } from '../componets/Empty';
import { PostCard } from '../contexts/PostCard';
import { Profile } from '../componets/Profile';

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isToUpdate, setIsToUpdate] = useState(false)
  const [id, setId] = useState("")

  const {
    posts, setPosts, createPost,
    setPostImage, postImage,
    messagePost, setMessagePost,
    isPostsLoading
  } = useContext(PostContext);


  const createNewPost = async () => {
    setIsLoading(true)
    await createPost()
    setIsLoading(false)
  };

  const handleDelete = async (id: string) => {

    try {
      await api.delete(`/post?id=${id}`);
      setPosts((prev: any) => prev.filter((product: any) => product.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack >
      <VStack>
        <Spacer />
        <Profile />
        <Logout />
      </VStack>
      <VStack minW={"md"}>
        <Textarea
          placeholder="Write your thoughts here..."
          size="md"
          resize="vertical"
          focusBorderColor="teal.500"
          borderColor="gray.300"
          variant="outline"
          value={messagePost} onChange={(e) => setMessagePost(e.target.value)}
          rows={4}
        />
        <Input
          colorScheme='teal'
          type="file"
          accept="image/*"
          onChange={(e) => setPostImage(e.target.files ? e.target.files[0] : null)}
        />
        <Button isLoading={isLoading} isDisabled={postImage ? false : true} w={"full"} onClick={() => { createNewPost() }} colorScheme='green' variant="solid">{"Post"}</Button>
      </VStack>
      <Box>
        {isPostsLoading && (
          <Progress maxW="md" minW="md" size="xs" isIndeterminate />
        )}
        {posts.length >= 0 && !isPostsLoading ?
          <>
            {posts?.map((post: any) => (
              <Flex key={post.id} justify="space-between" align="center" mb={4}>
                <Box>
                  <PostCard text={post.message} date={
                    new Date(post.postDate).toLocaleString('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })
                  } imageUrl={post.mediaUrl} userName={post.user.username} />
                  <VStack my={5}>
                    <Button onClick={() => handleDelete(post.id)} flex='1' colorScheme="red" variant='ghost'>
                      Delete
                    </Button>
                  </VStack>
                </Box>
              </Flex>
            ))}
          </>
          : <>
            <Empty />
          </>}

      </Box>
    </VStack>
  );
};

export default MyProfile;
