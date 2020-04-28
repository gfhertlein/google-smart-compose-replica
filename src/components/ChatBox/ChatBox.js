import React from 'react';
import ReactDOM from 'react-dom';
import './Chatbox.css';
import * as tf from '@tensorflow/tfjs';
//let model;


//async function runthis() {
//    const MODEL_URL = '../../../src/model/model.json';
//    alert(ls ../);
//    const model = await tf.loadLayersModel(MODEL_URL);
//    console.log(model.summary());
//    const input = tf.tensor2d([10.0], [1,1]);
//    const result = model.predict(input);
//     alert(result);
//};
//
//runthis();


//// Define a model for linear regression.
//const model = tf.sequential();
//model.add(tf.layers.dense({units: 1, inputShape: [1]}));
//
//// Prepare the model for training: Specify the loss and the optimizer.
//model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
//
//// Generate some synthetic data for training.
//const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
//const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
//
//// Train the model using the data.
//model.fit(xs, ys).then(() => {
//  // Use the model to do inference on a data point the model hasn't seen before:
//  alert(model.predict(tf.tensor2d([5], [1, 1])));
//});




const setCursor = (wordLength) => {
  const el = document.getElementById("box");
  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(el.childNodes[0], wordLength);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
};

class ChatBox extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      html: ''
    }
    this.chatBox = React.createRef();
  }

  componentDidMount() {
    ['keydown', 'keyup'].forEach(evt => {
      this.chatBox.current.addEventListener(evt, this.updateMessage, false);
    });
  }

  updateMessage = (e) => {
    this.autoCompleteWord(e);
  }

  triggerSuggestions = (e, text, char) => {
    const textBeforeUpdate = e.target.innerText;
    const autocompletion = this.state.words[text].slice(char, this.state.words[text].length);
    this.setState({
      html: `${e.target.innerText}<span class="autocompletion-text">${autocompletion}</span>`
    });
    const newCursor = textBeforeUpdate.length;
    setCursor(newCursor);
  }

  autoCompleteWord = (e) => {
    if(e.which === 8) {
      return;
    }

    if(e.which === 13) {
      this.setState({
        html: e.target.innerText,
      });
      //alert(e.target.innerText);
      ReactDOM.findDOMNode(this.chatBox.current).focus();
      const updatedCursor = e.target.innerText.length;
      setCursor(updatedCursor);
      e.preventDefault();
    }
  }
  
  mod_predict = (e) => {
      
  }

  render () {
    //const { words } = this.state;
    //const wordsAbbrList = Object.keys(words);
    return (
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="card col-md-6">
        <h5 className="card-header">
          Simple Calculation
        </h5>
        <div className="card-body">
        <div className="ChatBox">
            <div className="ChatBoxMessage">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Number to Calculate</span>
              </div>
              <div
                ref={this.chatBox}
                contentEditable={true}
                className="form-control box"
                id="box"
                rows="5"
                dangerouslySetInnerHTML={ { __html: this.state.html } }
                aria-label="Message"/>
            </div>
            </div>
            <br/>
          </div>
          <div>
            <ul>
              <li>
                To make calculation press ENTER.
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default ChatBox;