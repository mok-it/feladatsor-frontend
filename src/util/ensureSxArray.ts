import { SxProps, Theme } from '@mui/material';

/**
 * Ensures that the return value is an array. If it's an sx array, it returns sx without modifications; if not an array, the return value is sx wrapped in an array.
 * According to the MUI documentation, sx prop can be an array or an object, passing an array is the recommended way.
 * //https://mui.com/system/getting-started/the-sx-prop/#passing-the-sx-prop
 * @param sx
 * @returns
 */
export const ensureSxArray = (sx?: SxProps<Theme>) => (Array.isArray(sx) ? sx : [sx]);
