docs-deploy:
	@git stash
	@rm -rf /tmp/docs
	@mkdir -p /tmp/docs
	@yarn docs:temp
	@git checkout gh-pages
	@git clean -fdx
	@rm -rf docs/
	@mkdir -p docs/
	@cp -rf /tmp/docs/. docs/
	@git add docs/
	@git commit docs/ -m "docs: automatic updates [skip ci]"
	@git push origin gh-pages
	@git push github gh-pages
	@echo
	@echo "Documentation built and published"
	@git checkout master
.PHONY: docs-deploy
