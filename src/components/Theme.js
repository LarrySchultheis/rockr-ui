import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(createTheme({
	spacing: 4,
	typography: {
		fontFamily: [
			'Roboto',
			'Raleway',
			'Open Sans',
		].join(','),
		h1: {
			fontSize: '5rem',
			fontFamily: 'Raleway',
		},
		h2: {
			fontSize: '3.5rem',
			fontFamily: 'Open Sans',
			fontStyle: 'bold',
		},
		h3: {
			fontSize: '2.5rem',
			fontFamily: 'Roboto',
		},
	},
	palette: {
		background: {
			default: '#009900' //green
		},
		primary: {
			main: '#1d1247', //indigo
		},
		secondary: {
			main: '#E769A6', //pink
		},
		error: {
			main: '#D72A2A', //red
		},
		warning: {
			main: '#FC7B09', //orange
		},
		info: {
			main: '#8A8A8A', //gray
		},
		success: {
			main: '#009900', //green
		},
		text: {
			primary: '#1d1247', //black
			secondary: '#FFFFFF', //white
		},
	}
}));

export default theme;

// CITE THIS
// https://www.geeksforgeeks.org/how-to-add-theme-to-your-react-app/