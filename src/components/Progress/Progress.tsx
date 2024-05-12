import {useSelector} from "react-redux";
import {getCurrentQuestion, getQuestions} from "../../store";
import classes from './Progress.module.scss';


function Progress() {
  const questions = useSelector(getQuestions);
  const current = useSelector(getCurrentQuestion);

  return (
    <div className={classes.container}>
      {questions.map((_, index) => {
        if (index < current) {
          return <div key={index} className={classes.dark}/>
        }
        if (index === current) {
          return <div key={index} className={classes.medium}/>
        }
        if (index > current) {
          return <div key={index} className={classes.light}/>
        }
      })}
    </div>
  )
}

export default Progress;