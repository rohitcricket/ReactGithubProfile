import React, { Component } from "react";
import ReactDOM from "react-dom";
import Profile from "./github/Profile.jsx";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "rohitcricket",
			userData: [],
			userRepos: [],
			perPage: 5
		};
	}

	// Get user data from Github

	getUserData() {
		$.ajax({
			url:
				"http://api.github.com/users/" +
					this.state.username +
					"?client_id=" +
					this.props.clientId +
					"&client_secret=" +
					this.props.clientSecret,
			dataType: "json",
			cache: false,
			success: function(data) {
				this.setState({ userData: data });
				console.log(data);
			}.bind(this),
			error: function(xhr, status, err) {
				this.setState({ username: null });
				alert(err);
			}.bind(this)
		});
	}

	componentDidMount() {
		this.getUserData();
	}

	render() {
		return (
			<div>
				<Profile userData={this.state.userData} />
			</div>
		);
	}
}

App.propTypes = {
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string
};
App.defaultProps = {
	clientId: "dea70ddd406f14fc5a39",
	clientSecret: "ea56a6543369225ae31804ae85e0de252eff7057"
};

export default App;
