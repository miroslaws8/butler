import React from 'react';
import {Accordion, Button, Group, ScrollArea, SimpleGrid, Text, Textarea, Title, Stack} from "@mantine/core";
import {defaultText, setupActionPhrases} from "../Configs/setupActionPhrases";
import {config} from "../Configs/app";
import CopyButton from "./CopyButton";

const DialogContent = ({ selectionText, answerText, actionPhrase, setActionPhrase }) => {
    return (
        <>
            <Group>
                <Title order={3}>{ config.name }</Title>
            </Group>

            <Stack>
                <Title order={5}>Client's response:</Title>
                <ScrollArea.Autosize maxHeight={150}>
                    <div className='butlerScrollAreaBlock'>
                        <Text fz="md">{ selectionText || defaultText }</Text>
                    </div>
                </ScrollArea.Autosize>
            </Stack>

            { answerText &&
                <Stack>
                    <Title order={5}>Generated response:</Title>
                    <ScrollArea.Autosize maxHeight={150}>
                        <div className='butlerScrollAreaBlock'>
                            <Text>{ answerText }</Text>
                        </div>
                    </ScrollArea.Autosize>
                    <CopyButton answerText={answerText} />
                </Stack>
            }

            <Textarea
                label="Setup phrase"
                withAsterisk
                value={actionPhrase}
                onChange={(e) => setActionPhrase(e.target.value)}
            />

            <Accordion defaultValue={'examples'}>
                <Accordion.Item value="examples">
                    <Accordion.Control>
                        <Text size={13}>Please choose how you would like to reply by selecting one of the options below:</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <SimpleGrid cols={2}>
                            { setupActionPhrases.map((item) => <Button type={''} variant="light" onClick={() => setActionPhrase(item.phrase)}>{ item.title }</Button>) }
                        </SimpleGrid>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default DialogContent;