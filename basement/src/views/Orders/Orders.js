import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Flex, Grid, Icon, Text } from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import BillingRow from "../../components/Tables/BillingRow";
import TransactionRow from "../../components/Tables/TransactionRow";
import {
  billingData,
  newestTransactions,
  olderTransactions,
} from "../../variables/general";

const Orders = () => {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }} mx='auto'>
      <Grid templateColumns={{ sm: "1fr", lg: "60% 38%" }}>
        {/* Billing Information */}
        <Card my={{ lg: "24px" }} me={{ lg: "24px" }}>
          <Flex direction='column'>
            <CardHeader py='12px'>
              <Text color='#fff' fontSize='lg' fontWeight='bold'>
                Billing Information
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction='column' w='100%'>
                {billingData.map((row,i) => {
                  return (
                    <BillingRow
                      key={i}
                      name={row.name}
                      company={row.company}
                      email={row.email}
                      number={row.number}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
        {/* Transactions List */}
        <Card my='24px' ms={{ lg: "24px" }}>
          <CardHeader mb='12px'>
            <Flex direction='column' w='100%'>
              <Flex
                direction={{ sm: "column", lg: "row" }}
                justify={{ sm: "center", lg: "space-between" }}
                align={{ sm: "center" }}
                w='100%'
                my={{ md: "12px" }}>
                <Text
                  color='#fff'
                  fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
                  fontWeight='bold'>
                  Your Transactions
                </Text>
                <Flex align='center'>
                  <Icon
                    as={FaRegCalendarAlt}
                    color='gray.400'
                    w='15px'
                    h='15px'
                    me='6px'
                  />
                  <Text color='gray.400' fontSize='sm'>
                    23 - 30 March 2021
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction='column' w='100%'>
              <Text color='gray.400' fontSize='xs' mb='18px'>
                NEWEST
              </Text>
              {newestTransactions.map((row,i) => {
                return (
                  <TransactionRow
                    key={i}
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                  />
                );
              })}
              <Text color='gray.400' fontSize='xs' my='18px'>
                OLDER
              </Text>
              {olderTransactions.map((row, i) => {
                return (
                  <TransactionRow
                    key={i}
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  )
}

export default Orders