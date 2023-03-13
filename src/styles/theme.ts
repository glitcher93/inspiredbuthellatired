import { createTheme } from "@mui/material";

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
        fontFamily: "Nunito Sans, sans-serif",
        fontWeightMedium: 600,
        fontSize: 16,
        h1: {
            fontFamily: "Abel, sans-serif",
            fontSize: `3rem`,
            fontWeight: 600,
        },
        h2: {
            fontFamily: "Abel, sans-serif",
            fontSize: `2.25rem`,
            fontWeight: 600,
        },
        h3: {
            fontFamily: "Abel, sans-serif",
            fontWeight: 600,
        },
        h4: {
            fontFamily: "Abel, sans-serif",
            fontWeight: 600,
        },
        h5: {
            fontFamily: "Abel, sans-serif",
            fontWeight: 600,
        },
        h6: {
            fontFamily: "Abel, sans-serif",
            fontWeight: 600,
        }
    }
})

export default theme;