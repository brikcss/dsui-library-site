# DirectScale UI Library

> DS UI offers a well-defined _"design system"_ of standards along with a library of independently deployable, front end building blocks to benefit all who interact with DS UI.

<!-- Shields. -->
<p>
	<!-- NPM version. -->
	<!-- <a href="https://www.npmjs.com/package/@brikcss/starter-module">
		<img alt="NPM version" src="https://img.shields.io/npm/v/@brikcss/starter-module.svg?style=flat-square">
	</a> -->
	<!-- NPM downloads/month. -->
	<!-- <a href="https://www.npmjs.com/package/@brikcss/starter-module">
		<img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/@brikcss/starter-module.svg?style=flat-square">
	</a> -->
	<!-- Travis branch. -->
	<a href="https://github.com/brikcss/starter-module/tree/master">
		<img alt="Travis branch" src="https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square&label=master">
	</a>
	<!-- Commitizen friendly. -->
	<a href="http://commitizen.github.io/cz-cli/">
		<img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square">
	</a>
	<!-- Semantic release. -->
	<!-- <a href="https://github.com/semantic-release/semantic-release">
		<img alt="semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square">
	</a> -->
	<!-- Prettier code style. -->
	<a href="https://prettier.io/">
		<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
	</a>
	<!-- MIT License. -->
	<!-- <a href="https://choosealicense.com/licenses/mit/">
		<img alt="License" src="https://img.shields.io/npm/l/express.svg?style=flat-square">
	</a> -->
</p>

## Benefits

- _UX / Developers_: Save tons of time. Front end design and development is faster and easier. Use case:
	- Refer to [screenshot of a page from Ancestry's UI](https://www.ancestry.com/cs/standards/getting-started#try-it-out).
	- Any Ancestry developer can code that entire page in **less than a few hours (possibly minutes), instead of days or weeks**, which is what it would take to code from scratch.
	- Likewise, UX designers can design an entire page by "copying and pasting" prebuilt components together in a matter of minutes.
- _Developers / QA / Clients / End Users_: Fewer bugs and increased insight into how certain changes will affect other parts of the UI. This eliminates the _"whack-a-mole effect"_: a symptom of monolithic front end codebases where it is impossible to know what other bugs might "pop up" by simple code changes.
- _UX / Developers / Clients / End Users_: A predictable, consistent, and uniform UI.
- _UX / Developers / Clients / End Users_: UX designs translate into pixel-perfect UI.
- _Developers / Clients / End Users_: Everything is optimized for mobile.
- _Developers / Clients / End Users_: Front end performance is a first-class citizen.
- _Developers_: Code bases are easier to understand by reducing duplication and bloat.
- _Developers_: Easily version and deprecate or remove pieces of code.
- _UX / Developers / QA / Clients / End Users_: Improved collaboration, communication, and training through the UI Library site.
- _Developers_: Stay sane my friend.
- _The Company_: Money. It's worth calling out that all the above benefits -- huge savings in time, reduced bugs, better quality, etc. -- also means **huge savings in money** for The Company. More work gets done with fewer resources, fewer issues come up, clients are happier, and execs are happier.

## FAQ

> Why not use a pre-built library, such as Material Bootstrap or Angular Material?

The simple answer: none will meet our individual use cases and needs.

_Case in point:_

1. DirectScale's BackOffice app consumes the Bootstrap library. However, in reality it uses very little Bootstrap code. For example, somewhere along the way the Bootstrap dropdown plugin didn't meet the needs for a particular use case; so another dropdown plugin was brought in for that case. Later a 3rd dropdown plugin was brought in for a separate use case. So now there are 3 dropdown plugins to solve for three only slightly different use cases.

1. Another example is the main navigation menu of the back office. We follow Material Design specs, yet the main navigation was created specific to our needs. There is no Material spec for the main navigation component; it was intentionally decided to deviate from Material specs.

These two examples are illustrations of common problems with third party libraries. Even though third party libraries are supposed to cut down on development time and minimize the need to write custom code, we are still writing a significant amount of custom code on top of the included libraries.

_Advantages of DS UI Library over third party libraries:_

- Components are designed and built to our special needs and use cases. Rather than include another dropdown plugin (because the one already included doesn't meet the requirements for a new feature), we are able to extend our current DS dropdown and make it configurable for all use cases.
- Material Design itself has “gaps” in their specs (things open for interpretation) that are filled by defining them in our UI.
- Every Material Design library varies in its implementation. Ownership over the UI library gives us the option to include third party plugins (as opposed to entire libraries) when a plugin meets our needs.
- Everything is its own self-contained package, so teams can consume only what they truly need.

## References

- [A Comprehensive Guide to Design Systems](https://www.invisionapp.com/blog/guide-to-design-systems/) (awesome article with more references!)
- [Ancestry's UI library](http://standards.ancestry.com/)
- [Illustration of problems that Ancestry's UI library solves](https://www.ancestry.com/cs/standards/getting-started#try-it-out)
- [PluralSight's UI library](http://design-system.pluralsight.com/)
- [Atomic Design System](http://atomicdesign.bradfrost.com/table-of-contents/) (a popular design system and methodology)
