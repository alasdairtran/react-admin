import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from '@mochilabs/ra-core';
import * as React from 'react';
import { memo } from 'react';

const PaginationLimit = () => {
    const translate = useTranslate();
    return (
        <CardContent>
            <Typography variant="body2">
                {translate('ra.navigation.no_results')}
            </Typography>
        </CardContent>
    );
};

export default memo(PaginationLimit);
