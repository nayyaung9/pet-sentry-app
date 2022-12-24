import React from 'react';
import { Text, View } from 'react-native';
import ContainerLayout from '~components/ContainerLayout';
import Header from '~components/Header';

const Post: React.FC = () => {
  return (
    <ContainerLayout header={<Header title="Post" />}>
      <Text>Post Stack Screen</Text>
    </ContainerLayout>
  )
}

export default Post;