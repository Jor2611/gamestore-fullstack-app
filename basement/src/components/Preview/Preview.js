import { useWatch } from 'react-hook-form';
import { Box, Grid, GridItem, Text, Heading } from '@chakra-ui/react';
import GradientBorder from '../GradientBorder/GradientBorder';
import Gallery from './Gallery';
import Player from './Player';


const Preview = ({ control }) => {
  const { 
    name, 
    background_image, 
    released,
    description,
    rating, 
    metacritic, 
    clip, 
    genres, 
    platforms, 
    publisher, 
    short_screenshots 
  } = useWatch({ control });

  return (
    <GradientBorder w='100%' display={{ xs:'none', lg:'block' }}>
    <Box w='100%' minHeight='400px' bg='rgb(19,21,54)' color='#FFF'>
      <Grid templateColumns='1fr' w='100%'>
        {short_screenshots && short_screenshots.length ? (
          <GridItem w='100%' overflow={'hidden'} borderBottom='1px solid gray'>
            <Gallery w='100%' images={short_screenshots.map(item => item.image)} bgImage={background_image}/>
          </GridItem>
        ) : null}
        {name && (
          <GridItem w='100%' borderBottom='1px solid gray'>
            <Heading variant='h3' p={3}>{name}</Heading>
          </GridItem>
        )}
        <GridItem>
          <Grid templateColumns={{  xl: 'repeat(2, 2fr)' }} w='100%' my={"20px"} gap={4} px={5}>
            <GridItem w='100%'>
              <Text as='p'><Text as='b'>Publisher: &nbsp;</Text>{publisher}</Text>
            </GridItem>
            <GridItem w='100%'>
              <Text as='p'> 
                <Text as='b'>Genre: &nbsp;</Text>{genres && genres.map((genre,i) => (<Text as='span' key={i}>{i!==0 && ', '}{genre.label}</Text>))}
              </Text>
            </GridItem>
            <GridItem w='100%'>
              <Text as='p'>
                <Text as='b'>Platforms: &nbsp;</Text>{platforms && platforms.map((platform,i) => (<Text as='span' key={i}>{i!==0 && ', '}{platform.label}</Text>))}
              </Text>
            </GridItem>
            <GridItem w='100%'>
              <Text as='p'>
                <Text as='b'>Released: &nbsp;</Text>{released}
              </Text>
            </GridItem>
            <GridItem w='100%'>
              <Text as='p'>
                <Text as='b'>Rating: &nbsp;</Text>{rating}
              </Text>
            </GridItem>
            <GridItem w='100%'>
              <Text as='p'>
                <Text as='b'>Metacritic: &nbsp;</Text>{metacritic}
              </Text>
            </GridItem>

            <GridItem w='100%' colSpan={2}>
              <Text as='p'>
                <Text as='b'>Description: &nbsp;</Text>{description}
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
        { clip && (
          <GridItem w='100%'>
            <Player url={clip}  width='100%' height="400px"/>
          </GridItem>
        )}       
      </Grid>
    </Box>
    </GradientBorder>
  )
}

export default Preview;