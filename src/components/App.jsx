import React, { Fragment, Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import List from './List';
import EmptyPage from './EmptyPage';
import TabBar from './TabBar';
import ItemShow from './ItemShow';
import db from '../db';

class App extends Component {
  state = {
    wines: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('https://api-wine.herokuapp.com/api/v1/wines')
      .then(this.handleErrors)
      .then(res => res.json())
      .then(data => {
        this.setState({ wines: data });
        return data;
      })
      .then(wines => {
        db.setAll(wines);
      })
      .catch((error) => {
        db
          .getAll()
          .then((wines) => {
            this.setState({ wines });
          });
      });
  };

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  }

  renderContent() {
    if (!this.state.wines.length) {
      return <div />;
    }

    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={() => <List items={this.state.wines} />} />
          <Route path="/wine/:id" component={() => <ItemShow items={this.state.wines} />} />
          <Route path="/wishlist" component={EmptyPage} />
          <Route path="/cellar" component={EmptyPage} />
          <Route path="/articles" component={EmptyPage} />
          <Route path="/profile" component={EmptyPage} />
        </Switch>
        <TabBar />
      </Fragment>
    );
  }

  render() {
    return (
      <Router>
        <Fragment>
          {this.renderContent()}
        </Fragment>
      </Router>
    );
  }
}

export default App;
