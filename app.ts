/// <reference path="typings/angular2/angular2.d.ts" />

import {
	Component,
	NgFor,
	View,
	bootstrap
}
from "angular2/angular2";

class Article {
	title: string;
	link: string;
	votes: number;

	constructor(title, link) {
		this.title = title;
		this.link = link;
		this.votes = 0;
	}

	voteUp() {
		this.votes += 1;
		return false;
	}

	voteDown() {
		this.votes -= 1;
		return false;
	}
}

@
Component({
	selector: 'reddit-article',
	properties: ['article']
})@ View({
	template: `
	<article>
		<div class="votes">{{ article.votes }}</div>
		<div class="main">
			<h2>
				<a href="{{ article.link }}">{{ article.title }}</a>
			</h2>
			<ul>
				<li><a href (click)='article.voteUp()'>upvote</a></li>
				<li><a href (click)='article.voteDown()'>downvote</a></li>
			</ul>
		</div>
	</article>
	`
})
class RedditArticle {
	votes: number;
	title: string;
	link: string;
}


@
Component({
	selector: 'reddit'
})@ View({
	directives: [RedditArticle, NgFor],
	template: `
	<section class="new-link">
		<div class="control-group">
			<div><label for="title">Title:</label></div>
			<div><input name="title" #newtitle></div>
		</div>
		<div class="control-group">
			<div><label for="link">Link:</label></div>
			<div><input name="link" #newlink></div>
		</div>

		<button (click)="addArticle(newtitle, newlink)">Submit Link</button>
	</section>

	<reddit-article *ng-for="#article of articles" [article]="article"></reddit-article>
`
})
class RedditApp {
	articles: Array < article > ;

	constructor() {
			this.articles = [
					new Article('Angular 2', 'http://angular.io'),
					new Article('Fullstack', 'http://angular.io')
			];
	}

	addArticle(title, link) {
		console.log("Adding article with title", title.value, "and link", link.value);
	}
}

bootstrap(RedditApp);