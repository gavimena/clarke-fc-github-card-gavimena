'use strict';

var app =  function() {

	let adalabUsers = [];
	let adalaberInfo = {};
	const userSelect = document.getElementById('user-select');
	const userContainer = document.querySelector('.user-container');
	const memberSince = document.querySelector('.member-since');

	fetch('https://api.github.com/orgs/adalab/public_members?per_page=68')
		.then(function(response){
			return response.json();
		})
		.then(function(json){
			adalabUsers = json;

			for (var i = 0; i < adalabUsers.length; i++) {
				let optionUser = document.createElement('option');
				optionUser.value = adalabUsers[i].login;
				optionUser.innerHTML = adalabUsers[i].login;
				userSelect.appendChild(optionUser);
			}
		});

	userSelect.addEventListener('change', () => {
		let userName = event.target.value;

		fetch(`https://api.github.com/users/${userName}`)
			.then(function(response){
					return response.json();
				})
				.then(function(json){
					adalaberInfo = json;

		renderUserInfo(adalaberInfo);
		})
	});

	function renderUserInfo(adalaberInfo) {
		console.log('dentro render', adalaberInfo);
		userContainer.innerHTML = `
			<img src=https://avatars1.githubusercontent.com/u/${adalaberInfo.id} alt="adalaber avatar">
			<div>
				<p>@${adalaberInfo.login}</p>
				<h2>${adalaberInfo.name}</h2>
				<p>${adalaberInfo.location}</p>
			</div>
			<div>
				<div>
					<h2>${adalaberInfo.public_repos}</h2>
					<p>Repos</p>
				</div>
				<div>
					<h2>${adalaberInfo.followers}</h2>
					<p>Followers</p>
				</div>
				<div>
					<h2>${adalaberInfo.following}</h2>
					<p>Following</p>
				</div>
			</div>`;
		memberSince.innerHTML = `Miembro desde ${adalaberInfo.created_at}`;
	}
}

app();
