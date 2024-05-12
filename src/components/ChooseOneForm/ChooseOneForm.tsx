import {Answer, QuestionWithAnswers} from "types";
import {addAnswer, nextQuestion} from "../../store";
import {useDispatch} from "react-redux";
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Radio,
	RadioGroup,
	Typography
} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import {useCallback} from "react";

interface ChooseOneFormProps {
	data: QuestionWithAnswers
}

type FormValues = {
	chooseOne: string
}

const initialValues = {
	chooseOne: '',
}

const validationSchema = yup.object().shape({
	chooseOne: yup
		.string()
		.required('Выберите ответ.')
})

function ChooseOneForm({data: {id, question, answers}}: ChooseOneFormProps) {
	const dispatch = useDispatch()

	const handleSubmit = useCallback((values: FormValues) => {
		const answer: Answer = {
			questionId: id,
			body: values
		}
		dispatch(addAnswer(answer))
		dispatch(nextQuestion())
	}, [dispatch, id])

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Typography variant="h5" component="h2" margin="1rem 0">
				{question}
			</Typography>

			<FormControl
				fullWidth
				size="medium"
				margin="normal"
				id="chooseOne"
				error={formik.touched.chooseOne && Boolean(formik.errors.chooseOne)}
			>
				<Box display="flex" flexDirection="column" gap="1rem">
					<RadioGroup
						aria-labelledby="chooseOne"
						name="chooseOne"
						value={formik.values.chooseOne}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					>
						{answers.map((answer, index) => (
							<FormControlLabel
								key={index}
								value={answer}
								control={<Radio/>}
								label={answer}
							/>
						))}
					</RadioGroup>

					{formik.touched.chooseOne && formik.errors.chooseOne && (
						<FormHelperText>{formik.errors.chooseOne}</FormHelperText>
					)}
				</Box>
			</FormControl>

			<Button variant="contained" type="submit" size="large">
				Ответить
			</Button>
		</form>
	);
}

export default ChooseOneForm;