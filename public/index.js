// Special thanks to Arturo Ramirez for helping me complete this code
function displayBlogs(posts){
	$('.getDiv').html("");

	for(let i = 0; i< posts.post.length;i++){
		$('.getDiv').append(`
							<div>${posts.post[i].id}</div>
							<div>${posts.post[i].title}</div>
							<div>${posts.post[i].content}</div>
							<div>${posts.post[i].author}</div>
							<div>${posts.post[i].publishDate}</div>
	
							`);
	}
}

function get(){

	let url = './blogs/list-blogs';
	let settings = {
			method : 'GET',
			headers : {
				'Content-Type' : 'application/json'
			}
	};

	fetch(url, settings)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJSON => {
			displayBlogs(responseJSON);
		})
		.catch(err => {
			console.log(err)
		});
}

function displayAuthor(autor){
	$('.autorDiv').html("");

	for(let i = 0; i< autor.post.length;i++){
		$('.autorDiv').append(`
							<div>${autor.post[i].id}</div>
							<div>${autor.post[i].title}</div>
							<div>${autor.post[i].content}</div>
							<div>${autor.post[i].author}</div>
							<div>${autor.post[i].publishDate}</div>
							<p></p>
							`);
	}
}

function getAutor(autor){
	let url = `./blogs/list-blogs/${autor}`;
	let settings = {
			method : 'GET',
			headers : {
				'Content-Type' : 'application/json'
			}
	};

	fetch(url, settings)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJSON => {
			console.log(responseJSON);
			displayAuthor(responseJSON);
		})
		.catch(err => {
			console.log(err)
		});
}

function post(data){
	let url = './blogs/list-blogs';
	let settings = {
						method : 'POST',
						headers : {
							'Content-Type' : 'application/json'
						},
						body : JSON.stringify(data)
					};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			else{
				return new Promise(function(resolve, reject){
					resolve(response.json());
				})
				.then(data =>{
					throw new Error(data.message);
				})
			}
		})
		.then(responseJSON => {
			get();
			$('.postTitle').val("");
			$('.postAuthor').val("");
			$('.postContent').val("");
			$('.postDate').val("");
		})
		.catch(err => {
			console.log(err);
		});
}

function deletePost(id){
	let data = {
		id : id
	}
	let url = `./blogs/list-blogs/${id}`;
	let settings = {
						method : 'DELETE',
						headers : {
							'Content-Type' : 'application/json'
						},
						body : JSON.stringify(data)
					};

	fetch(url, settings)
		.then(responseJSON => {
			get();
			$('.delId').val("");
		})
		.catch(err => {
			console.log(err)
		});
}

function put(id,data){
	let url = `./blogs/blog-posts/${id}`;
	let settings = {
					method : 'PUT',
					headers : {
						'Content-Type' : 'application/json'
					},
					body : JSON.stringify(data)
				};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			else{
				return new Promise(function(resolve, reject){
					resolve(response.json());
				})
				.then(data =>{
					throw new Error(data.message);
				})
			}
		})
		.then(responseJSON => {
			get();
		})
		.catch(err => {
			console.log(err);
		});
}




function watchForm(){
	$('.getForm').on('submit', function(event) {
		event.preventDefault();
		get();
	});

	$('.getAuthorForm').on('submit', function(event) {
		event.preventDefault();
		let autor = $('.authorName').val();
		getAutor(autor);
	});

	$('.postForm').on('submit', function(event) {
		event.preventDefault();
		let title= $('.postTitle').val();
		let postAutor = $('.postAuthor').val();
		let content = $('.postContent').val();
		let publishDate = $('.postDate').val();

		let data = {
			title : title,
			content : content,
			author : postAutor,
			publishDate : publishDate
		};
		post(data);
	});

	$('.deleteForm').on('submit', function(event) {
		event.preventDefault();
		let idDel = $('.delId').val();
		deletePost(idDel);
	});

	$('.putForm').on('submit', function(event) {
		event.preventDefault();
		let id = $('.putId').val()
		let title= $('.putTitle').val();
		let postAutor = $('.putAuthor').val();
		let content = $('.putContent').val();
		let publishDate = $('.putDate').val();

		let data = {
		};

		if(title != "")
			data.title = title;
		if(postAutor != "")
			data.author = postAutor;
		if(content != "")
			data.content = content;
		if(publishDate != "")
			data.publishDate = publishDate;

		put(id,data);
	});
}

function init(){
	$(watchForm);
}

$(init);