import {Answer, QuestionWithAnswers} from "types";
import {useDispatch} from "react-redux";
import {Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {useFormik} from "formik";
import {addAnswer, nextQuestion} from "../../store";
import * as yup from "yup";
import {useCallback} from "react";

interface SelectOneFormProps {
	data: QuestionWithAnswers
}

interface FormValues {
	selectOne: string
}

const initialValues = {
	selectOne: '',
}

const validationSchema = yup.object().shape({
	selectOne: yup
		.string()
		.required('Выберите ответ.')
})

function SelectOneForm({data: {id, question, answers}}: SelectOneFormProps) {
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
				id="selectOne"
				error={formik.touched.selectOne && Boolean(formik.errors.selectOne)}
			>
				<Box display="flex" flexDirection="column" gap="1rem">
					<InputLabel id="select-one">Выберите ответ</InputLabel>
					<Select
						id="selectOne"
						label="Выберите ответ"
						name="selectOne"
						value={formik.values.selectOne}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					>
						<MenuItem value={''}>Без ответа</MenuItem>
						{answers.map((answer, index) => (
							<MenuItem key={index} value={answer}>{answer}</MenuItem>)
						)}
					</Select>

					{formik.touched.selectOne && formik.errors.selectOne && (
						<FormHelperText>{formik.errors.selectOne}</FormHelperText>
					)}
				</Box>
			</FormControl>
			<Button variant="contained" type="submit" size="large">
				Ответить
			</Button>
		</form>
	);
}

export default SelectOneForm;