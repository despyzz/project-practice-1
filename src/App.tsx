import QuestionForm from "./components/QuestionForm/QuestionForm.tsx";
import Progress from "./components/Progress/Progress.tsx";
import {Box, Typography} from "@mui/material";

function App() {
	return (
		<>
			<header>
				<Box
					margin="2rem 0"
				>
					<Typography variant="h4" component="h1">
						Тестирование
					</Typography>
				</Box>
				<Progress/>
			</header>
			<main>
				<QuestionForm/>
			</main>
		</>
	)
}

export default App
