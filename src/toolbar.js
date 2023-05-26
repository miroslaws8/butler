import React from 'react';
import ReactDOM from "react-dom/client";
import {MantineProvider, Switch, Title, Stack, Container, Text} from "@mantine/core";
import {useChromeStorageLocal} from 'use-chrome-storage';
import {config} from "./Configs/app";

import './index.css';
import {ChromeService} from "./Services/ChromeService";

const Toolbar = () => {
    const [butlerActive, setButlerActive] = useChromeStorageLocal(ChromeService.getStorageKey(), true);

    return (
        <MantineProvider>
            <div className='toolbarContainer'>
                <Container size="xs" px="md" py="md">
                    <Stack>
                        <Title order={3}>{ config.name }</Title>
                        <Switch
                            onLabel="ON"
                            offLabel="OFF"
                            checked={butlerActive}
                            onChange={(event) => setButlerActive(event.currentTarget.checked)}
                            label={`Activate ${config.name}`}
                        />
                        <Text c="dimmed">Thanks for the install! Visit our website <a href='https://hubforce.com/'>Hubforce.com</a> to find out more about our products.</Text>
                    </Stack>
                </Container>
            </div>
        </MantineProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('toolbar'));
root.render(<Toolbar />);