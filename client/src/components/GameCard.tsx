import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Text
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import Game from '../entities/Game';
import getCroppedImageUrl from '../services/image-url';
import CriticScore from './CriticScore';
import PlatformIconList from './PlatformIconList';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {

  const navigate = useNavigate();

  return (
    //@ts-ignore
    <Card height="100%">
      <Image src={getCroppedImageUrl(game.background_image)} style={{ cursor: 'pointer' }} onClick={() => navigate('/games/'+game.slug)}/>
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms?.map(
              (p) => p.platform
            )}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2xl">
          <Link to={'/games/' + game.slug}>{game.name}</Link>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
