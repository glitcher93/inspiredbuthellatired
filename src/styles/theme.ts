import { createTheme } from "@mui/material";
import { TypographyVariantsOptions } from "@mui/material";

interface CustomTypog extends TypographyVariantsOptions {
    a: TypographyVariantsOptions
    b: TypographyVariantsOptions
}

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 375,
            md: 768,
            lg: 1280,
            xl: 1550
        }
    },
    typography: {
        a: {
            fontFamily: "Nunito Sans, sans-serif",
            fontSize: 16,
            fontWeightMedium: 600
        },
        b: {
            fontFamily: "Abel, sans-serif",
            fontSize: 16
        }
    } as CustomTypog
})

export default theme;