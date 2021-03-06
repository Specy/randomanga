import {
  Box,
  Center,
  Text,
  VStack,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import SimpleForm from './SimpleForm';
import AdvancedForm from './AdvancedForm';

const GeneratorForm = props => {
  return (
    <Center>
      <VStack w={['full', 'full', '2xl']} alignItems="center">
        <Heading
          fontWeight={'bold'}
          fontFamily={'body'}
          fontSize={['2xl', '3xl']}
        >
          Random Manga Generator
        </Heading>
        <Box bg="orange.500" rounded="full" h={0.5} w={'95%'} maxW={'xl'} />
        <Text fontSize={['xs', 'sm']} color="gray.400">
          Fill in the form below to get a customized random list.
        </Text>
        <Tabs
          py={'5'}
          variant="soft-rounded"
          colorScheme="whiteAlpha"
          w={'full'}
          size="sm"
        >
          <TabList
            w="full"
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            <Tab
              fontSize={'xs'}
              _selected={{ bg: 'dark.400', color: 'white' }}
              _focus
            >
              Simple
            </Tab>
            <Tab
              fontSize={'xs'}
              _selected={{ bg: 'dark.400', color: 'white' }}
              _focus
            >
              Advanced
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleForm />
            </TabPanel>
            <TabPanel>
              <AdvancedForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Center>
  );
};
export default GeneratorForm;
