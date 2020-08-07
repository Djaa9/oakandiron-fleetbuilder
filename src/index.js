import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { grey } from '@material-ui/core/colors';


document.body.style.backgroundColor = grey[200];

document.getElementById('root').addEventListener('touchstart', function(event){
  this.allowUp = (this.scrollTop > 0);
  this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
  this.prevTop = null; this.prevBot = null;
  this.lastY = event.pageY;
});

document.getElementById('root').addEventListener('touchmove', function(event){
  var up = (event.pageY > this.lastY), down = !up;
  this.lastY = event.pageY;

  if ((up && this.allowUp) || (down && this.allowDown)) event.stopPropagation();
  else event.preventDefault();
});

ReactDOM.render(
  <React.StrictMode>
    <meta name='viewport' content='width=device-width' />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
