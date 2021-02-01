# Form Builder Changelog

## 3.2.0 - 2021-01-31

### Fixed
- Now compatible with the new field layout designer
- Fixed UI issues
- Fixed Integrations

## 3.1.4.4 - 2020-11-03

### Fixed
- Merged #19

## 3.1.4.3 - 2020-07-13

### Added
- Email integration can now have custom email template path
- Assets can now be attached to email notification

## 3.1.4.2 - 2020-07-13

### Added
- Added template hooks to submission email template. `fb-email-template-matrixBlockQuery-hook` and `fb-email-template-section-hook`

## 3.1.4.1 - 2020-07-13

### Fixed
- Forgot to defined variable

## 3.1.4 - 2020-07-13

### Added
- Added template hooks for submission template. `fb-view-submission-matrixBlockQuery-hook` and `fb-view-submission-section-hook`

## 3.1.3.1 - 2020-07-07

### Fixed
- Fixed ajax error in Entries index page

### Improved
- Added crumbs to edit pages

## 3.1.3 - 2020-07-07

### Added
- Submission will return `errors` object when submission fails validation
- Ajax added custom redirect value, if setup

### Fixed
- Moved integration actions to after the submission has been saved

## 3.1.2 - 2020-07-07

### Added
- Email integration can now send a copy to sender

## 3.1.1 - 2020-07-07

### Added
- Added event for plugins to modify or add new allowed field types
- Added field type Forms, forms can now be added to entries

## 3.1.0 - 2020-07-06

### Improved
- Updated UI to match with Craft UI
- Exposed Forms Services via `craft.fbForms.methods()`

### Fixed
- Various bug fixes, updated deprecated functions

## 3.0.20 - 2019-10-16

### Fixed
- Fixed usage of custom templates for fields

## 3.0.19 - 2019-08-28

### Fixed
- Fixed DateTime error when sending out notification emails
- Fixed DateTime format for html5 date inputs

## 3.0.18 - 2019-08-26

### Fixed
- Fixed integrity constraint violation for 'uid' when saving forms

### Added
- Entries can now be exported into CSV
- Added the missing "required" input attribute from datetime fields

## 3.0.17 - 2019-08-14

### Fixed
- Date/Time should now save correctly to database and display correct format

## 3.0.16 - 2019-08-06

### Fixed
- Updates allowAnonymous support

## 3.0.15 - 2019-06-14

### Improved
- Add return for success and error messages when entry is saved [PR](https://github.com/roundhouse/Form-Builder-3/pull/3)

## 3.0.14 - 2019-03-14

### Fixed
- Fixed issue with email notification template breaking submissions

## 3.0.13 - 2019-03-13

### Fixed
- Fixed integrations breaking forms edit page

## 3.0.12 - 2019-03-12

### Improved
- Updated the way input templates get rendered behind the scenes

## 3.0.11 - 2019-01-11

### Fixed
- Fixed custom redirects

## 3.0.10 - 2018-12-20

### Fixed
- Converge integration now accepts Dropdown values for expiration date
- Made fields available to integrations right away as long as they are saved on the form

## 3.0.9 - 2018-12-19

### Fixed
- Integrations sometimes broke forms if it missed `integrationId`

## 3.0.8 - 2018-12-17

### Added
- Updated integrations database columns
- Added [Integrations plugin](https://github.com/roundhouse/Form-Builder-Integrations)

## 3.0.7 - 2018-12-11

### Fixed
- Database migration bugs

## 3.0.6 - 2018-12-03

### Added
- You can now migration your old FormBuilder 2 Forms and Entries
- Added column to entries table for postedOn date

#### Fixed
- Some bug fixes and 

#### Improved
- Code cleanup

## 3.0.5 - 2018-10-31

### Changed :ghost:
- You can now just pass form handle into your frontend snippet code

## 3.0.4 - 2018-10-24

### Fixed
- Entries index page

### Added
- Slack notification integration
- Email notification integration

## 3.0.3 - 2018-09-11

### Fixed
- Fixed Changelog

## 3.0.2 - 2018-09-11 [CRITICAL]

### Added
- Fixed security vulnerabilities, part 2
- Updated user group permissions across the plugin

## 3.0.1 - 2018-08-16 [CRITICAL]

### Added
- Fixed security vulnerabilities


## 3.0.0 - 2018-01-22

### Added
- Initial release
