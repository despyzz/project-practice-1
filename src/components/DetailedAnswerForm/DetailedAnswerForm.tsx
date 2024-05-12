import {Answer, QuestionWithoutAnswers} from "types";
import {addAnswer, nextQuestion} from "../../store";
import {useDispatch} from "react-redux";
import {Box, Button, FormControl, FormHelperText, styled, TextareaAutosize, Typography} from "@mui/material";
import * as yup from "yup";
import {useCallback} from "react";
import {useFormik} from "formik";

interface DetailedAnswerFormProps {
	data: QuestionWithoutAnswers
}

type FormValues = {
	detailedAnswer: string
}

const initialValues = {
	detailedAnswer: '',
}

const validationSchema = yup.object().shape({
	detailedAnswer: yup
		.string()
		.required('Ответ не должен быть пустым.')
		.min(30, 'Ответ слишком короткий. Минимальная длинна сообщения 30 символов.')
})

const blue = {
	100: '#DAECFF',
	200: '#b6daff',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E5',
	900: '#003A75',
};

const grey = {
	50: '#F3F6F9',
	100: '#E5EAF2',
	200: '#DAE2ED',
	300: '#C7D0DD',
	400: '#B0B8C4',
	500: '#9DA8B7',
	600: '#6B7A90',
	700: '#434D5B',
	800: '#303740',
	900: '#1C2025',
};

const Textarea = styled(TextareaAutosize)(
	({theme}) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    resize: none;

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

function DetailedAnswerForm({data: {id, question}}: DetailedAnswerFormProps) {
	const dispatch = useDispatch();

	const handleSubmit = useCallback((values: FormValues) => {
		const answer: Answer = {
			questionId: id,
			body: values.detailedAnswer
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
				id="detailedAnswer"
				error={formik.touched.detailedAnswer && Boolean(formik.errors.detailedAnswer)}
			>
				<Box display="flex" flexDirection="column" gap="1rem">
					<Textarea
						name="detailedAnswer"
						aria-label="empty textarea"
						minRows={3}
						value={formik.values.detailedAnswer}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					{formik.touched.detailedAnswer && formik.errors.detailedAnswer && (
						<FormHelperText>{formik.errors.detailedAnswer}</FormHelperText>
					)}
				</Box>
			</FormControl>

			<Button variant="contained" type="submit">
				Ответить
			</Button>
		</form>
	);
}

export default DetailedAnswerForm;