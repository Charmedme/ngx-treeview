
# [1.0.0](https://www.npmjs.com/package/@charmedme/ngx-treeview) (2022-06-01)

### Enhancement:

- Upgrade to Angular 13
- Upgrade to Bootstrap 4.6
- Upgrade to new package-lock file
----------
# [2.0.0](https://www.npmjs.com/package/@charmedme/ngx-treeview) (2022-08-06)

### Enhancement:

- Upgrade to Bootstrap 5
----------
# [2.0.4](https://www.npmjs.com/package/@charmedme/ngx-treeview) (2022-08-06)

### Fixes:
- Rollup fixes of 2.0.1...2.0.3
- Fix an alignment issue with the a treeview when it has no children
----------
# [2.0.5](https://www.npmjs.com/package/@charmedme/ngx-treeview) (2022-08-09)

### Enhancement:

- Add an option to toggle between a compact view and the default view

### Fixes:

- Fix an alignment issue with the a treeview when it has no children

----------

# [2.0.6](https://www.npmjs.com/package/@charmedme/ngx-treeview) (2022-08-11)

### Fixes:

- Fix the checkbox focus border was cut-off due to an overflow on the treeview-container

----------

# [2.0.7](https://www.npmjs.com/package/@charmedme/ngx-treeview) (2022-08-11)

### Enhancement:

- Update readme

----------

# [3.0.0](https://www.npmjs.com/package/@charmedme/ngx-treeview) (2026-02-13)

### Enhancement:

- Upgrade workspace and library to Angular 21
- Upgrade TypeScript, ng-packagr, and related build tooling to Angular 21-compatible versions
- Upgrade `gh-pages` to `^6.3.0` to address the prototype pollution advisory (GHSA-8mmm-9v2q-x3f9)

### Fixes:

- Fix demo startup (`npm run start`) by using root base href for local development
- Keep GitHub Pages compatibility by setting `--base-href /ngx-treeview/` in `build:demo`
- Refresh tests/configuration for Angular 21 migration compatibility

### Breaking Changes:

- Upgrade Angular peer dependency range to `^21.0.0`
- Re-release as major version to reflect Angular 21 compatibility changes from `2.0.8`

----------
