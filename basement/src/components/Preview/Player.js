import React from 'react';
import ReactPlayer from 'react-player';
import { Box, Heading } from '@chakra-ui/react';
import { Separator } from '../Separator/Separator';

const Player = ({ url, height, width }) => {
  return (
    <Box my={5} p={2}>
      <Separator/>
      <Heading size={'md'} my={5}>Sneak Peak</Heading>
      <ReactPlayer url={url} controls width={width} height={height} />
    </Box>
  );
};

export default Player;
