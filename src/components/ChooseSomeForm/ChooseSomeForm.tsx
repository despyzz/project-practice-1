import {Answer, QuestionWithAnswers} from "types";
import {addAnswer, nextQuestion} from "../../store";
import {useDispatch} from "react-redux";
import {
	Box,
	Button, Checkbox,
	FormControl,
	FormControlLabel, FormGroup,
	FormHelperText,
	Typography
} from "@mui/material";
import * as yup from "yup";
import {useCallback, useMemo} from "react";
import {useFormik} from "formik";

interface ChooseSomeFormProps {
	data: QuestionWithAnswers
}

type FormValues = {
	chooseSome: Record<string, boolean>
}

const validationSchema = yup.object().shape({
	chooseSome: yup
		.object()
		.test('at-least-one', 'Выберите хотя бы один ответ', value => Object.values(value).some(v => v))
})

function ChooseSomeForm({data: {id, question, answers}}: ChooseSomeFormProps) {
	const dispatch = useDispatch()

	const initialValues = useMemo(() => ({
		chooseSome: answers.reduce((acc, curr) => ({...acc, [curr]: false}), {}),
	}), [answers]);

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
				id="chooseSome"
				error={formik.touched.chooseSome && Boolean(formik.errors.chooseSome)}
			>
				<Box display="flex" flexDirection="column" gap="1rem">
					<FormGroup>
						{answers.map((answer, index) => (
							<FormControlLabel
								key={index}
								control={
									<Checkbox
										name={`chooseSome.${answer}`}
										checked={formik.values.chooseSome[answer as keyof typeof formik.values.chooseSome] || false}
										onChange={formik.handleChange}
									/>
								}
								label={answer}
							/>
						))}
					</FormGroup>

					{formik.touched.chooseSome && formik.errors.chooseSome && (
						<FormHelperText>{formik.errors.chooseSome.toString()}</FormHelperText>
					)}
				</Box>
			</FormControl>

			<Button variant="contained" type="submit">
				Ответить
			</Button>
		</form>
	);
}

export default ChooseSomeForm;
