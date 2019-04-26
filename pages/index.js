import React, { Component } from "react";
import { Container, Header, Button, Card } from "semantic-ui-react";
import { UserSession } from "blockstack";

class Home extends Component {
  state = {
    currentUser: null
  };

  componentDidMount = async () => {
    const userSession = new UserSession(this.props.appConfig);
    if (userSession.isUserSignedIn()) {
      const currentUser = userSession.loadUserData();
      this.setState({ currentUser });
    } else if (userSession.isSignInPending()) {
      const currentUser = await userSession.handlePendingSignIn();
      this.setState({ currentUser });
    }
  };

  login = () => {
    const userSession = new UserSession(this.props.appConfig);
    userSession.redirectToSignIn();
  };

  logout = () => {
    const userSession = new UserSession(this.props.appConfig);
    userSession.signUserOut();
    this.setState({
      currentUser: null
    });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <Container textAlign="center">
        <Header as="h2" block>
          Next.js Blockstack
        </Header>
        {currentUser ? (
          <Card centered>
            <Card.Content>
              <Card.Header>Logged in as</Card.Header>
              <Card.Meta>{currentUser.username}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="red" onClick={this.logout}>
                  Logout
                </Button>
              </div>
            </Card.Content>
          </Card>
        ) : (
          <Card centered>
            <Card.Content>
              <Card.Header>Blockstack</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green" onClick={this.login}>
                  Login
                </Button>
              </div>
            </Card.Content>
          </Card>
        )}
      </Container>
    );
  }
}

export default Home;
