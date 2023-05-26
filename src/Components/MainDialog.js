/* global chrome */

import {useEffect, useRef, useState} from 'react';
import { Dialog, Button, Stack, Loader, Title, Grid, Text, Tooltip } from '@mantine/core';
import {setupActionPhrases} from "../Configs/setupActionPhrases";
import {openai} from "../Services/OpenAiFactory";
import {useChromeStorageLocal} from 'use-chrome-storage';
import DialogContent from "./DialogContent";
import {useCounter} from "@mantine/hooks";

const MainDialog = () => {
    const [opened, setOpened] = useState(false);
    const [selectionText] = useChromeStorageLocal('hubforceSelectionText', '');
    const [actionPhrase, setActionPhrase] = useState(setupActionPhrases[0].phrase);
    const [answerText, setAnswerText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [openCount, setOpenCountHandler] = useCounter(0);

    useEffect(() => {
        setAnswerText('');

        openCount > 1 && setOpened(true);

        setOpenCountHandler.increment();
    }, [selectionText]);

    const generate = () => {
        setIsLoading(true);

        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: `${actionPhrase}.'.This is text: ${selectionText}`}],
        })
            .then(res => {
                setAnswerText((res.data.choices[0].message.content).trim());
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            { !opened &&
                <Button className='butlerInitButton'
                        compact={true}
                        type={''}
                        onClick={() => setOpened((o) => !o)}
                        variant="gradient" gradient={{ from: 'violet', to: 'grape' }}
                >
                    <Title order={2}>H</Title>
                </Button>
            }

            <Dialog
                transition="slide-up"
                transitionDuration={300}
                transitionTimingFunction="ease"
                opened={opened}
                withCloseButton
                onClose={() => setOpened(false)}
                size="xl"
                radius="md"
            >
                <Stack>
                    <DialogContent
                        answerText={answerText}
                        selectionText={selectionText}
                        actionPhrase={actionPhrase}
                        setActionPhrase={setActionPhrase}
                    />

                    <Grid>
                        <Grid.Col span="auto">
                            <Tooltip label="Close">
                                <Button type={''} variant="light" color="gray" onClick={() => setOpened(false)}>
                                    <Text size={13}>✕</Text>
                                </Button>
                            </Tooltip>
                        </Grid.Col>
                        <Grid.Col span="auto">
                            <Tooltip label="Reset">
                                <Button type={''} variant="light" color="gray" onClick={() => setAnswerText('')}>
                                    <Text size={13}>↺</Text>
                                </Button>
                            </Tooltip>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Button
                                onClick={() => generate()}
                                variant="gradient"
                                type={''}
                                gradient={{ from: 'violet', to: 'grape' }}
                                styles={() => ({
                                    root: {
                                        width: '100%'
                                    },
                                })}
                            >
                                { isLoading ? <Loader className='butlerLoaderWhite' variant="dots" /> : 'Generate' }
                            </Button>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Dialog>
        </>
    );

};

export default MainDialog;