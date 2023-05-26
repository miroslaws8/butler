import React, {useEffect, useState} from 'react';
import {Button} from "@mantine/core";

const CopyButton = ({ answerText }) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        setIsCopied(false);
    }, [answerText])

    const copy = () => {
        navigator.clipboard.writeText(answerText)
            .then(() => setIsCopied(true));
    };

    return (
        <Button size="xs" compact onClick={() => copy()} variant="subtle" color="gray">
            { isCopied ? '✓ Copied' : 'Copy answer' }
        </Button>
    );
};

export default CopyButton;