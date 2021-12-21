import React from 'react';
import styled from 'styled-components';
import { Box, BoxProps } from '@material-ui/core';
import { Silicoin } from '@silicoin/icons';

const StyledSilicoin = styled(Silicoin)`
  max-width: 100%;
  width: auto;
  height: auto;
`;

export default function Logo(props: BoxProps) {
  return (
    <Box {...props}>
      <StyledSilicoin />
    </Box>
  );
}
