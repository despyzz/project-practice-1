import {Answer, QuestionWithoutAnswers} from "types";
import {addAnswer, nextQuestion} from "../../store";
import {useDispatch} from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography
} from "@mui/material";
import {useFormik} from "formik";
import {useCallback} from "react";
import * as yup from "yup";

interface ShortAnswerFormProps {
  data: QuestionWithoutAnswers
}

type FormValues = {
  shortAnswer: string
}

const initialValues = {
  shortAnswer: '',
}

const validationSchema = yup.object().shape({
  shortAnswer: yup
    .string()
    .required('Ответ не должен быть пустым.')
    .max(30, 'Ответ должен быть не более 30 символов.')
})

function ShortAnswerForm({data: {id, question}}: ShortAnswerFormProps) {
  const dispatch = useDispatch();

  const handleSubmit = useCallback((values: FormValues) => {
    const answer: Answer = {
      questionId: id,
      body: values.shortAnswer
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
      <Typography variant="h5" component="h3" margin="1rem 0">
        {question}
      </Typography>

      <FormControl
        fullWidth
        size="medium"
        margin="normal"
        id="shortAnswer"
        error={formik.touched.shortAnswer && Boolean(formik.errors.shortAnswer)}
      >
        <Box display="flex" flexDirection="column" gap="1rem">
          <TextField
            value={formik.values.shortAnswer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="shortAnswer"
            label="Введите ответ"
            variant="outlined"
          />

          {formik.touched.shortAnswer && formik.errors.shortAnswer && (
            <FormHelperText>{formik.errors.shortAnswer}</FormHelperText>
          )}
        </Box>
      </FormControl>

      <Button variant="contained" type="submit">
        Ответить
      </Button>
    </form>
  );
}

export default ShortAnswerForm;