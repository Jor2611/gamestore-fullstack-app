import React from "react";
import { Flex, Grid, Text } from "@chakra-ui/react";

const KeyManagement = () => {
  console.log("KEY ReNDER")
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }} mx='auto'>
      <Grid templateColumns={{ sm: "1fr", lg: "60% 38%" }} h='150vh'>
        <Text color='#FFF'>On Progress</Text>
      </Grid>
    </Flex>
  )
}

export default KeyManagement;