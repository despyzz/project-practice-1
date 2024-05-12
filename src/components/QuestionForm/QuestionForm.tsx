import {useSelector} from "react-redux";
import {getCurrentQuestion, getQuestions} from "../../store";
import {QuestionWithAnswers, QuestionWithoutAnswers} from "types";
import {ChooseOneForm} from "../ChooseOneForm";
import {ChooseSomeForm} from "../ChooseSomeForm";
import {ShortAnswerForm} from "../ShortAnswerForm";
import {DetailedAnswerForm} from "../DetailedAnswerForm";
import {Typography} from "@mui/material";
import {SelectOneForm} from "../SelectOneForm";

const QuestionForm = () => {
	const questions = useSelector(getQuestions);
	const current = useSelector(getCurrentQuestion);

	if (current >= questions.length) {
		return (
			<Typography variant="h5" component="h2" marginTop={"1rem"}>
				Тест окончен
			</Typography>
		);
	}

	switch (questions[current].type) {
		case 'selectOne':
			return <SelectOneForm data={questions[current] as QuestionWithAnswers}/>;
		case 'chooseOne':
			return <ChooseOneForm data={questions[current] as QuestionWithAnswers}/>;
		case 'chooseSome':
			return <ChooseSomeForm data={questions[current] as QuestionWithAnswers}/>;
		case 'shortAnswer':
			return <ShortAnswerForm data={questions[current] as QuestionWithoutAnswers}/>;
		case 'detailedAnswer':
			return <DetailedAnswerForm data={questions[current] as QuestionWithoutAnswers}/>;
		default:
			console.error('Question data does not match any known form type.');
			return null;
	}
};

export default QuestionForm;