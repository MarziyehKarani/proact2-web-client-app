import React, { useEffect, useState } from "react"
import {
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap"
import TextareaWithMaxlength from "../../../components/Common/TextareaWithMaxlength"
import MoodSelector from "../../Messages/Components/MoodSelector"
import NumericSlider from "../../../components/Common/NumericSlider"

function createCompiledQuestionByIds(questionId, ids) {
  var answers = []
  ids.forEach(element => {
    answers.push({
      answerId: element,
    })
  })

  var question = {
    questionId: questionId,
    answers: answers,
  }

  return question
}

function createCompiledQuestionByValue(questionId, value) {
  var answers = []
  answers.push({
    value: value + "",
  })

  var question = {
    questionId: questionId,
    answers: answers,
  }

  return question
}

const NotCompiledOpenAnswer = ({ question, addCompiledQuestion }) => {
  function handleValueChange(value) {
    var compiledQuestion = createCompiledQuestionByValue(question.id, value)
    addCompiledQuestion(compiledQuestion)
  }
  return (
    <TextareaWithMaxlength
      maxLength="500"
      rows="5"
      onChange={e => handleValueChange(e.target.value)}
    />
  )
}

//-------------------------------------------------------------------------------------------------
const NotCompiledSingleAnswer = ({
  question,
  addCompiledQuestion,
  enableNextQuestion,
}) => {

  function handleValueChange(answerId) {
    var answersId = []
    answersId.push(answerId)
    enabledChildQuestion(question.id, answerId)
    var compiledQuestion = createCompiledQuestionByIds(question.id, answersId)
    addCompiledQuestion(compiledQuestion)
  }

  function enabledChildQuestion(questionId, answerId) {
    // recupera risposta
    const answer = question?.answersContainer?.selectableAnswers.find(
      itm => itm.answerId === answerId
    )
    // controlla se la risposta ha una ChildQuestion
    if (answer) {
        let childQuestionId = answer.childQuestionId
        enableNextQuestion(questionId, answerId, childQuestionId)
        
      }
     
  }

  return (
    <FormGroup tag="fieldset">
      {question.answersContainer.selectableAnswers.map((answer, idx) => (
        <FormGroup key={idx} check className="my-2">
          <Label check>
            <Input
              type="radio"
              name={question.id}
              value={answer.answerId}
              onChange={e => handleValueChange(e.target.value)}
            />{" "}
            {answer.label}
          </Label>
        </FormGroup>
      ))}
    </FormGroup>
  )
}

const NotCompiledMultipleAnswer = ({ question, addCompiledQuestion }) => {
  const [checkedItems, setCheckedItems] = useState([])

  useEffect(() => {
    if (checkedItems && checkedItems.length > 0) {
      var compiledQuestion = createCompiledQuestionByIds(
        question.id,
        checkedItems
      )
      addCompiledQuestion(compiledQuestion)
    }
  }, [checkedItems])

  function handleValueChange(value, checked) {
    if (checked) {
      addItem(value)
    } else {
      removeItem(value)
    }
  }

  function addItem(value) {
    var idx = checkedItems.indexOf(value)
    if (idx == -1) {
      var items = checkedItems.slice()
      items.push(value)
      setCheckedItems(items)
    }
  }

  function removeItem(value) {
    var idx = checkedItems.indexOf(value)
    if (idx != -1) {
      var items = checkedItems.slice()
      items.splice(idx, 1)
      setCheckedItems(items)
    }
  }

  return (
    <FormGroup tag="fieldset">
      {question.answersContainer.selectableAnswers.map((answer, idx) => (
        <FormGroup key={idx} check className="my-2">
          <Label check>
            <Input
              type="checkbox"
              name={question.id}
              value={answer.answerId}
              onChange={e =>
                handleValueChange(e.target.value, e.target.checked)
              }
            />{" "}
            {answer.label}
          </Label>
        </FormGroup>
      ))}
    </FormGroup>
  )
}

const NotCompiledBooleanAnswer = ({ props, question, addCompiledQuestion }) => {
  const [value, setValue] = useState(null)

  function handleValueChange(value) {
    setValue(value)
    var compiledQuestion = createCompiledQuestionByValue(question.id, value)
    addCompiledQuestion(compiledQuestion)
  }

  return (
    <ButtonGroup>
      <Button
        color="success"
        outline
        onClick={() => handleValueChange(true)}
        active={value!=null && value}
      >
        {props.t("True")}
      </Button>
      <Button
        color="danger"
        outline
        onClick={() => handleValueChange(false)}
        active={value!=null && !value}
      >
        {props.t("False")}
      </Button>
    </ButtonGroup>
  )
}

const NotCompiledRatingAnswer = ({ question, addCompiledQuestion }) => {
  function handleValueChange(value) {
    var compiledQuestion = createCompiledQuestionByValue(question.id, value)
    addCompiledQuestion(compiledQuestion)
  }
  return (
    <Row>
      <Col xs="8">
        <NumericSlider
          min={question.properties.min}
          max={question.properties.max}
          minLabel={question.properties.minLabel}
          maxLabel={question.properties.maxLabel}
          onValueChange={handleValueChange}
        />
      </Col>
    </Row>
  )
}

const NotCompiledMoodAnswer = ({ question, addCompiledQuestion }) => {
  function handleValueChange(value) {
    var compiledQuestion = createCompiledQuestionByValue(question.id, value)
    addCompiledQuestion(compiledQuestion)
  }
  return <MoodSelector onMoodChange={handleValueChange} />
}

const NotCompiledNumericAnswer = ({ props, question, addCompiledQuestion }) => {

  const [error, setError] = useState(false);

  const min=question.properties.min;
  const max=question.properties.max;

  const maxAsString = max.toString();
  const maxLength = maxAsString.length;

  const decimalPlaces=question.properties.decimalCount;
  const [value, setValue] = useState('');

  function handleValueChange(value) {

    const enteredValue =value;
    setValue(enteredValue);

    if (enteredValue === '') {
      setValue(enteredValue);
      setError(false); // Reset error message for empty input or '-' or '.'
      return;
    }
  }

    function handleValidation(value) {

      const enteredValue =value;
      const pattern =new RegExp(`^-?\\d{0,${maxLength}}\\.?\\d{0,${decimalPlaces}}$`);
  
      if (enteredValue === '') {
        setValue(enteredValue);
        setError(false); // Reset error message for empty input or '-' or '.'
        return;
      }
  
      if (pattern.test(enteredValue)) {
  
          const number = parseFloat(enteredValue);
          console.log(number);
          if (!isNaN(number)) {
            if (number >= min && number <= max) {
              setValue(enteredValue);
              var compiledQuestion = createCompiledQuestionByValue(question.id, value)
              addCompiledQuestion(compiledQuestion)
              setError(false);
            } 
            else
            {
              setError(true);
            }
          }
      }
      else
      {
        setError(true);
      }


  }

  var hint = props.t("NumericInputPlaceHolder");
  hint = hint.replace("{min}", min);
  hint = hint.replace("{max}", max);
  hint = hint.replace("{decimalPlaces}", decimalPlaces);

  return (
    <div>
    <Input
    type="text"
    value={value}
    onChange={e => handleValueChange(e.target.value)}
    onBlur={e=> handleValidation(e.target.value)}
    placeholder={hint}
  />
       {/* Display error message if it exists */}
       {error && <p style={{ color: 'red' }}>{props.t("InvalidNumber")}</p>}
       </div>
  )
}

export {
  NotCompiledOpenAnswer,
  NotCompiledMultipleAnswer,
  NotCompiledSingleAnswer,
  NotCompiledBooleanAnswer,
  NotCompiledRatingAnswer,
  NotCompiledMoodAnswer,
  NotCompiledNumericAnswer
}
