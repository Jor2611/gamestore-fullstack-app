import { useContext, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Text, Grid, GridItem, Button } from '@chakra-ui/react';
import { Separator } from '../../components/Separator/Separator';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import CustomInput from '../../components/Input/CustomInput';
import Preview from '../../components/Preview/Preview';
import PreviewPlaceholder from '../../components/Preview/PreviewPlaceholder';
import CustomSelect from '../../components/Input/CustomSelect';
import CustomTextArea from '../../components/Input/CustomTextArea';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { LayoutContext } from '../../store/LayoutContext';
import { fetchGame, updateGame } from '../../utils/http';

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


const EditGame = () => {
  const { gameId } = useParams();
  const [fetchedGame, setFetchedGame] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { genres, platforms } = useContext(LayoutContext);

  useEffect(() => {
    async function fetchGameData(){
      try{
        const response = await fetchGame(gameId);
        const { gallery, ...gameData } = response.data;
        const adaptedGameData = { ...gameData, short_screenshots: gallery.map((item,i) => ({ id: i, image: item })) };
        setFetchedGame(prevState => ({ ...prevState, ...adaptedGameData }));
        reset(adaptedGameData);
      }catch(err){
        console.log(err);
      }
    }

    fetchGameData();
  },[gameId,navigate]);


  const { 
    reset,
    watch,
    control,
    getValues,
    handleSubmit,
    formState: { 
      isDirty,
      isSubmitting
    } 
  } = useForm({ defaultValues: initialValues });


  const watchForAllFields = watch();

  useEffect(() => {
    const values = getValues();
    setShowPreview(JSON.stringify(initialValues)!==JSON.stringify(values))
  },[watchForAllFields]);

  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'short_screenshots'
  });

  const validate = {
    name: { required: true },
    publisher: { required: true },
    slug: { required: "At least 2 characters", minLength: 2 },
    released: { required: true, minLength: 6 },
    rating: { 
      required: "Value must be in range 1 and 5", 
      min: 1, 
      max: 5
    },
    metacritic: {
      required: "Value must be in range 0 and 100", 
      min: 0, 
      max: 100
    },
    genres: { required: 'At least one option required!' },
    platforms: { required: 'At least one option required!' },
    description: { 
      required: 'Required characters range is 50-700!', 
      minLength: 50, 
      maxLength: 700 
    },
    background_image: { 
      pattern: { 
        value: new RegExp ('^(https?://)'), 
        message: 'Value must be a URL' 
      }, 
      required: true 
    },
    clip: { 
      pattern: { 
        value: new RegExp ('^(https?://)'), 
        message: 'Value must be a URL' 
      }, 
      required: false 
    },
    screenshots: { 
      pattern: { 
        value: new RegExp ('^(https?://)'), 
        message: 'Value must be a URL' 
      }, 
      required: false 
    }
  };

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
      const response = await updateGame(gameId, adaptedData);
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
                Edit Game
              </Text>
            </Flex>
          </CardHeader>
          <Separator/>
          <CardBody>
            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
              <Grid 
                templateColumns={'repeat(1,1fr)'} 
                w='100%' 
                h="45px" 
                my={{ xs:"40px", md: "20px"}}
                textAlign='center' 
                gap={6}
              >
                <Text fontSize={{ xs: "small", md: 'medium' }} color='#FFF'>
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
                        validate={validate.name}
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Publisher'}
                        name={'publisher'}
                        control={control}
                        type='text'
                        placeholder='Publishers name'
                        validate={validate.publisher}
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Slug'}
                        name={'slug'}
                        control={control}
                        type='text'
                        placeholder='Slug'
                        validate={validate.slug}
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Released'}
                        name={'released'}
                        control={control}
                        type='text'
                        placeholder='Release Date'
                        validate={validate.released}            
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Rating'}
                        name={'rating'}
                        control={control}
                        type='number'
                        placeholder='Game Rating'
                        validate={validate.rating}
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Metacritic'}
                        name={'metacritic'}
                        control={control}
                        type='number'
                        placeholder='Metacritic Score'
                        validate={validate.metacritic}
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomSelect
                        label={'Genres'}
                        name={'genres'}
                        control={control}
                        options={genres}
                        placeholder='Select genres'
                        validate={validate.genres}
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomSelect
                        label={'Platforms'}
                        name={'platforms'}
                        control={control}
                        options={platforms}
                        placeholder='Select Platforms'
                        validate={validate.platforms}
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
                        rows={6}
                        resizable='none'
                        placeholder='Game Description Goes Here...'
                        validate={validate.description}
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
                        validate={validate.background_image}
                      />
                    </GridItem>

                    <GridItem w='100%'>
                      <CustomInput
                        label={'Clip'}
                        name={'clip'}
                        control={control}
                        type='text'
                        placeholder='Clip URL'
                        validate={validate.clip}
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
                          validate={validate.screenshots}
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
                        borderRadius='20px'
                        fontSize='35px'
                        w='100%'
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
                    h='46px'
                    mx='10px'
                    my='20px'
                    onClick={() => reset({...fetchedGame})}
                  >
                    Reset
                  </Button>
                  <Button
                    variant='brand'
                    fontSize='10px'
                    maxW='350px'
                    w={{ xs:'100%', md:'30%' }}
                    h='46px'         
                    mx='10px'
                    my='20px'
                    type='submit'
                    loadingText='Creating...'  
                    isLoading={isSubmitting}
                    isDisabled={!isDirty || isSubmitting}
                  >
                    Update
                  </Button>
                </GridItem>
              </Grid>
            </form>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  )
}




export default EditGame;