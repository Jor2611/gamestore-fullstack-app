import { useContext, useEffect, useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Text, Grid, GridItem, Button } from '@chakra-ui/react';
import { fetchGame, updateGame } from '../../api/gameApi';
import { LayoutContext } from '../../store/LayoutContext';
import { gameEntityToFormAdapter, gameFormToEntityAdapter } from '../../utils/adapters';
import { FormInitialValues, FormValidation } from '../../utils/formManager';
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

const initialValues = FormInitialValues.editGame;
const validation = FormValidation.editGame;

const EditGame = () => {
  const { gameId } = useParams();
  const [fetchedGame, setFetchedGame] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { genres, platforms } = useContext(LayoutContext);
  
  const {
    reset,
    watch,
    control,
    getValues,
    handleSubmit,
    formState: { isDirty, isSubmitting }
  } = useForm({ defaultValues: initialValues });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'short_screenshots'
  });

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetchGame(gameId);
        const adaptedData = gameEntityToFormAdapter(response.data);
        setFetchedGame(adaptedData);
        reset(adaptedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGameData();
  }, [gameId, reset]);

  const watchForAllFields = watch();

  useEffect(() => {
    setShowPreview(JSON.stringify(initialValues) !== JSON.stringify(getValues()));
  }, [watchForAllFields, getValues]);


  const onSubmit = useCallback(async (data) => {
    try {
      setIsLoading(true);
      const adaptedData = gameFormToEntityAdapter(data);
      const response = await updateGame(gameId, adaptedData);
      if (response.success) {
        navigate('/game', { replace: true });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [gameId, navigate]);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }} mx='auto'>
      <LoadingOverlay isOpen={isLoading} />
      <Grid templateColumns={"1fr"}>
        <Card overflowX={{ xs: "scroll", xl: "hidden" }} pb='0px'>
          <CardHeader p='6px 0px 22px 0px'>
            <Flex justify='space-between' align='center'w='100%'>
              <Text fontSize='lg' color='#fff' fontWeight='bold'>
                Edit Game
              </Text>
            </Flex>
          </CardHeader>
          <Separator/>
          <CardBody>
            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
              <Grid templateColumns={'repeat(1,1fr)'} w='100%' h="45px" my={{ xs:"40px", md: "20px"}} textAlign='center' gap={6}>
                <Text fontSize={{ xs: "small", md: 'medium' }} color='#FFF'>
                  <Text as='b'>Attention: </Text>Recommended to fetch data from 3rd party resource (rawg.io). Use "Fetch Data" button on the top for doing so!
                </Text>
              </Grid>
              <Grid templateColumns={{ xs: '1fr', lg: '56% 42%' }} w='100%' my={"20px"} gap={6}>
                {/* General form */}
                <GridItem w='100%'>
                  <Grid templateColumns={{ xs: 'repeat(1,1fr)', md: 'repeat(2,1fr)', lg: 'repeat(1,1fr)', xl: 'repeat(2,1fr)' }} w='100%' my="10px" gap={6}>
                    {[
                      { name: 'name', label: 'Name', type: 'text', placeholder: 'Name', validation: validation.name },
                      { name: 'publisher', label: 'Publisher', type: 'text', placeholder: 'Publishers name', validation: validation.publisher },
                      { name: 'slug', label: 'Slug', type: 'text', placeholder: 'Slug', validation: validation.slug },
                      { name: 'released', label: 'Released', type: 'text', placeholder: 'Release Date', validation: validation.released },
                      { name: 'rating', label: 'Rating', type: 'number', placeholder: 'Game Rating', validation: validation.rating },
                      { name: 'metacritic', label: 'Metacritic', type: 'number', placeholder: 'Metacritic Score', validation: validation.metacritic },
                    ].map((input, index) => (
                      <GridItem key={index} w="100%">
                        <CustomInput {...input} control={control} />
                      </GridItem>
                    ))}
                    <GridItem w='100%'>
                      <CustomSelect label={'Genres'} name={'genres'} control={control} options={genres} placeholder='Select genres' validation={validation.genres}/>
                    </GridItem>
  
                    <GridItem w='100%'>
                      <CustomSelect label={'Platforms'} name={'platforms'} control={control} options={platforms} placeholder='Select Platforms' validation={validation.platforms}/>
                    </GridItem>
                  </Grid>
  
                  <Grid templateColumns={'repeat(1,1fr)'} w='100%' my="10px" gap={6}>
                    <GridItem w='100%'>
                      <CustomTextArea label={'Description'} name={'description'} control={control} rows={6} resizable='none' placeholder='Game Description Goes Here...' validation={validation.description}/>
                    </GridItem>
                  </Grid>
                </GridItem>
  
                {/* Preview */}
                <GridItem w='100%' display={{ xs: 'none', lg:'block' }} rowSpan={2}>
                  {showPreview ? <Preview control={control}/> : <PreviewPlaceholder/>}
                </GridItem>
  
                {/* Gallery */}
                <GridItem w='100%' rowSpan={2}>
                  <Grid templateColumns={{ xs: 'repeat(1,1fr)', md: 'repeat(2,1fr)', lg: 'repeat(1,1fr)', xl: 'repeat(2,1fr)' }} w='100%' my="10px" gap={6}>
                    <GridItem w='100%'>
                      <CustomInput label={'Background Image URL'} name={'background_image'} control={control} type='text' placeholder='Image URL' validation={validation.background_image}/>
                    </GridItem>
                    <GridItem w='100%'>
                      <CustomInput label={'Clip'} name={'clip'} control={control} type='text' placeholder='Clip URL' validation={validation.clip}/>
                    </GridItem>
  
                    {fields.map((_, i) => (
                      <GridItem key={i} w='100%'>
                        <CustomInput label={`Image ${i+1}`} name={`short_screenshots.${i}.image`} control={control} type='text' placeholder='Image URL' validation={validation.screenshots} remove={() => remove(i)}/>
                      </GridItem>
                    ))}
                  </Grid>
                  <Grid templateColumns={'repeat(1,1fr)'} w='100%' my="10px" gap={6}>
                    <GridItem w='100%'>
                      <Button variant='secondary' borderRadius='20px' fontSize='35px' w='100%' mt='20px' onClick={() => { append({ image: '' }) }}>+</Button>
                    </GridItem>  
                  </Grid>
                </GridItem>
  
                {/* ACTIONS */}
                <GridItem w='100%' display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} justifyContent={{ xs: 'center', md:'flex-end' }} alignItems='center'>
                  <Button variant='secondary' fontSize='10px' maxW='350px' w={{ sm:'100%', md:'30%' }} h='46px' mx='10px' my='20px' onClick={() => { reset({...fetchedGame}) }}> Reset </Button>
                  <Button variant='brand' fontSize='10px' maxW='350px' w={{ xs:'100%', md:'30%' }} h='46px'          mx='10px' my='20px' type='submit' loadingText='Creating...'   isLoading={isSubmitting} isDisabled={!isDirty || isSubmitting}> Update </Button>
                </GridItem>
              </Grid>
            </form>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  )
};

export default EditGame;











