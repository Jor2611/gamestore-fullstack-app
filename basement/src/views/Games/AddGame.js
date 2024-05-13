import { useContext, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Flex, Text, Grid, GridItem, Button, useDisclosure } from '@chakra-ui/react';
import { Separator } from '../../components/Separator/Separator';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import FetchGame from '../../components/Modals/FetchGame';
import CustomInput from '../../components/Input/CustomInput';
import Preview from '../../components/Preview/Preview';
import PreviewPlaceholder from '../../components/Preview/PreviewPlaceholder';
import CustomSelect from '../../components/Input/CustomSelect';
import CustomTextArea from '../../components/Input/CustomTextArea';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { LayoutContext } from '../../store/LayoutContext';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../../utils/http';


let initialValues = {
  name: '',
  slug: '',  
  background_image: '',
  description: '',
  released: '',
  rating: 0,
  metacritic: 0,
  clip: '',
  publisher: '',
  genres:[],
  platforms:[],
  short_screenshots: []
};

const AddGame = () => {
  const [fetchedGame, setFetchedGame] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { 
    genres, 
    genresMap, 
    platforms, 
    platformsMap
  } = useContext(LayoutContext);
  const { 
    control, 
    watch, 
    handleSubmit, 
    setValue, 
    reset, 
    getValues, 
    formState: { 
      isDirty, 
      defaultValues, 
      isSubmitting, 
      errors 
    } 
  } = useForm({ defaultValues: initialValues });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'short_screenshots'
  });

  const watchForAllFields = watch();

  useEffect(() => {
    if(fetchedGame){
      const values = getValues();
      Object.keys(fetchedGame).forEach((key,i) => {
        if(values.hasOwnProperty(key)){
          //Refactor
          if(key === 'genres' || key === 'platforms'){
            const map = key === 'genres' ? genresMap : platformsMap;
            const result = fetchedGame[key].reduce((acc,curr) => {
              const item = map.get(key === 'genres' ? curr.slug : curr.platform.slug);
              if(item){
                acc.push(item);
              }
              return acc;
            },[]);
            setValue(key,result);
          } else {            
            setValue(key,fetchedGame[key] || defaultValues[key]);
          } 
        }
      });
    }
  },[fetchedGame]);

  useEffect(() => {
    const values = getValues();
    setShowPreview(JSON.stringify(defaultValues)!==JSON.stringify(values))
  },[watchForAllFields])


  const { isOpen, onOpen, onClose } = useDisclosure();

  const adaptData = async(data) => {
    let adaptedData = data; 
    adaptedData.genreIds = adaptedData.genres.map(item => item.id);
    adaptedData.platformIds = adaptedData.platforms.map(item => item.id);
    adaptedData.gallery = adaptedData.short_screenshots.map(item => item.image);
    adaptedData.rating = parseFloat(adaptedData.rating);
    adaptedData.metacritic = parseInt(adaptedData.metacritic);
    delete adaptedData.short_screenshots;
    return adaptedData;
  };

  const onSubmit = async(data) => {
    try{
      setIsLoading(true);
      const adaptedData = await adaptData(data);
      const response = await createGame(adaptedData);
      navigate('/game', { replace: true });      
    }catch(err){
      console.log(err);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }} mx='auto'>
      <LoadingOverlay isOpen={isLoading} />
      <Grid templateColumns={"1fr"}>
        <Card overflowX={{ xs: "scroll", xl: "hidden" }} pb='0px'>
          <CardHeader p='6px 0px 22px 0px'>
            <Flex
              justify='space-between'
              align='center'
              w='100%'
            >
              <Text fontSize='lg' color='#fff' fontWeight='bold'>
                Add A New Game
              </Text>
              <Button
                variant='brand'
                fontSize='10px'
                fontWeight='bold'
                p='6px 32px'
                onClick={onOpen}
              >
                Fetch Data
              </Button>
            </Flex>
          </CardHeader>
          <Separator/>
          <CardBody>
            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
              <Grid 
                templateColumns={'repeat(1,1fr)'} 
                w='100%' 
                h="45px" 
                my="10px"
                textAlign='center' 
                gap={6}
              >
                <Text 
                  fontSize={{
                    xs: "small",
                    sm: 'medium'
                  }} 
                  color='#FFF'
                >
                  <Text as='b'>Attention: </Text>Recommended to fetch data from 3rd party resource (rawg.io). Use "Fetch Data" button on the top for doing so!
                </Text>
              </Grid>
              <Grid templateColumns={{ xs: '1fr', lg: '56% 42%' }} 
                w='100%' 
                my={"20px"} 
                gap={6}
              >
                {/* General form */}
                <GridItem w='100%'>
                  <Grid 
                    templateColumns={{ 
                      xs: 'repeat(1,1fr)', 
                      md: 'repeat(2,1fr)', 
                      lg: 'repeat(1,1fr)', 
                      xl: 'repeat(2,1fr)' 
                    }} 
                    w='100%' 
                    my="10px" 
                    gap={6}
                  >
                    <GridItem w='100%'>
                      <CustomInput
                        label={'Name'}
                        name={'name'}
                        control={control}
                        type='text'
                        placeholder='Name'
                        validate={{ required: true }}
                        error={errors.name}
                        w='100%'
                        h='46px'
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Publisher'}
                        name={'publisher'}
                        control={control}
                        type='text'
                        placeholder='Publishers name'
                        validate={{ required: true }}
                        error={errors.publisher}
                        w='100%'
                        h='46px'
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Slug'}
                        name={'slug'}
                        control={control}
                        type='text'
                        placeholder='Slug'
                        validate={{ required: "At least 2 characters", minLength: 2 }}
                        error={errors.slug}
                        w='100%'
                        h='46px'
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Released'}
                        name={'released'}
                        control={control}
                        type='text'
                        placeholder='Release Date'
                        validate={{ required: true, minLength: 6 }}
                        error={errors.released}
                        w='100%'
                        h='46px'
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Rating'}
                        name={'rating'}
                        control={control}
                        type='number'
                        placeholder='Game Rating'
                        validate={{ required: "Value must be in range 1 and 5", min: 1, max: 5, message: 'Rating must be between 1 and 5' }}
                        error={errors.rating}
                        w='100%'
                        h='46px'
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Metacritic'}
                        name={'metacritic'}
                        control={control}
                        type='number'
                        placeholder='Metacritic Score'
                        validate={{ required: "Value must be in range 0 and 100", min: 0, max: 100, message: 'Rating must be between 1 and 5' }}
                        error={errors.metacritic}
                        w='100%'
                        h='46px'
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomSelect
                        label={'Genres'}
                        name={'genres'}
                        options={genres}
                        control={control}
                        placeholder='Select genres'
                        validate={{ required: 'At least one option required!' }}
                        error={errors.genres}
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomSelect
                        label={'Platforms'}
                        name={'platforms'}
                        options={platforms}
                        control={control}
                        placeholder='Select Platforms'
                        validate={{ required: 'At least one option required!' }}
                        error={errors.platforms}
                      />
                    </GridItem>
                  </Grid>

                  <Grid 
                    templateColumns={'repeat(1,1fr)'} 
                    w='100%' 
                    my="10px" 
                    gap={6}
                  >
                    <GridItem w='100%'>
                      <CustomTextArea
                        label={'Description'}
                        name={'description'}
                        control={control}
                        placeholder='Game Description Goes Here...'
                        validate={{ required: 'Required characters range is 50-700!', minLength: 50, maxLength: 700 }}
                        error={errors.description}
                        w='100%'
                        rows={6}
                        resizable='none'
                      />
                    </GridItem>
                  </Grid>
                </GridItem>

                {/* Preview */}
                <GridItem 
                  w='100%' 
                  display={{ xs: 'none', lg:'block' }} 
                  rowSpan={2}
                >
                  {showPreview 
                    ? <Preview control={control}/> 
                    : <PreviewPlaceholder/>}
                </GridItem>

                {/* Gallery */}
                <GridItem 
                  w='100%' 
                  rowSpan={2}
                >
                  <Grid 
                    templateColumns={{ 
                      xs: 'repeat(1,1fr)', 
                      md: 'repeat(2,1fr)', 
                      lg: 'repeat(1,1fr)', 
                      xl: 'repeat(2,1fr)' 
                    }} 
                    w='100%' 
                    my="10px" 
                    gap={6}
                  >

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Background Image URL'}
                        name={'background_image'}
                        control={control}
                        type='text'
                        placeholder='Image URL'
                        validate={{ pattern: { value: new RegExp ('^(https?://)'), message: 'Value must be a URL' }, required: true }}
                        error={errors.background_image}
                        w='100%'
                        h='46px'
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Clip'}
                        name={'clip'}
                        control={control}
                        type='text'
                        placeholder='Clip URL'
                        validate={{ pattern: { value: new RegExp ('^(https?://)'), message: 'Value must be a URL' }, required: false }}
                        error={errors.clip}
                        w='100%'
                        h='46px'
                      />
                    </GridItem>

                    {fields.map((_, i) => (
                      <GridItem key={i} w='100%'>
                        <CustomInput
                          label={`Image ${i+1}`}
                          name={`short_screenshots.${i}.image`}
                          control={control}
                          type='text'
                          placeholder='Image URL'
                          validate={{ pattern: { value: new RegExp ('^(https?://)'), message: 'Value must be a URL' }, required: false }}
                          error={errors.short_screenshots && errors.short_screenshots[i] ? errors.short_screenshots[i].image : null}
                          w='100%'
                          h='46px'
                          remove={() => remove(i)}
                        />
                      </GridItem>
                    ))}
                  </Grid>
                  <Grid 
                    templateColumns={'repeat(1,1fr)'} 
                    w='100%' 
                    my="10px" 
                    gap={6}
                  >
                    <GridItem w='100%'>
                      <Button
                        variant='secondary'
                        fontSize='35px'
                        w='100%'
                        borderRadius='20px'
                        h='46px'
                        mt='20px'
                        onClick={() => { append({ image: '' }) }}
                      >
                        +
                      </Button>
                    </GridItem>  
                  </Grid>
                </GridItem>

                {/* ACTIONS */}
                <GridItem 
                  w='100%'
                  display={'flex'}
                  flexDirection={{ xs: 'row', ms: 'column' }}
                  justifyContent={{ xs: 'center', md:'flex-end' }}
                  alignItems='center'
                >
                  <Button
                    variant='secondary'
                    fontSize='10px'
                    maxW='350px'
                    w={{ sm:'100%', md:'30%' }}
                    h='45'
                    mb='20px'
                    mx='10px'
                    mt='20px'
                    onClick={() => reset()}
                  >
                    Reset
                  </Button>
                  <Button
                    variant='brand'
                    fontSize='10px'
                    maxW='350px'
                    w={{ xs:'100%', md:'30%' }}
                    h='45'         
                    mx='10px'
                    my='20px'
                    type='submit'
                    loadingText='Creating...'  
                    isLoading={isSubmitting}
                    isDisabled={!isDirty || isSubmitting}
                  >
                    Create
                  </Button>
                </GridItem>
              </Grid>
            </form>
          </CardBody>
        </Card>
      </Grid>
      <FetchGame 
        onClose={onClose} 
        isOpen={isOpen} 
        setFetched={setFetchedGame}
      />
    </Flex>
  )
}




export default AddGame;