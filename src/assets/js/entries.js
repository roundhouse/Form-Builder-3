/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

Craft.FileUploadsIndex = Garnish.Base.extend({
    $container: $('.upload-details'),
    elementIndex: null,

    init: function init(elementIndex, container, settings) {
        var $elements = void 0;
        this.elementIndex = elementIndex;
        this.$container = $(container);
        this.setSettings(settings, Craft.BaseElementIndexView.defaults);
        this.$loadingMoreSpinner = $('<div class="centeralign hidden">' + '<div class="spinner loadingmore"></div>' + '</div>').insertAfter(this.$container);
        this.$elementContainer = this.getElementContainer();

        $elements = this.$elementContainer.children();

        if (this.settings.context === 'index') {
            this.addListener(this.$elementContainer, 'dblclick', function (ev) {
                var $element;
                var $target = void 0;
                $target = $(ev.target);

                if ($target.hasClass('element')) {
                    $element = $target;
                } else {
                    $element = $target.closest('.element');
                }

                if ($element.length) {
                    this.createElementEditor($element);
                }
            });
        }
    },
    getElementContainer: function getElementContainer() {
        this.$table = this.$container.find('table:first');
        this.$table.children('tbody:first');
    },
    createElementEditor: function createElementEditor($element) {
        new Craft.ElementEditor($element, {
            onSaveElement: $.proxy(function (response) {
                return Craft.cp.displayNotice(Craft.t('form-builder', 'Asset updated'));
            }, this)
        });
    }
});

Garnish.$doc.ready(function () {
    if (Craft.elementIndex) {
        Craft.elementIndex.on('updateElements', function (e) {
            var elementsCount = void 0;
            var selectedSource = void 0;
            var unreadItems = void 0;

            Craft.postActionRequest('form-builder/entries/get-unread-entries', $.proxy(function (response, textStatus) {
                if (response.success) {
                    window.FormBuilder.unreadCount = response.count;

                    if (response.count > 0) {
                        return $('.total-entry-count').html(response.count);
                    } else {
                        return $('.total-entry-count').html('');
                    }
                }
            }, this));

            selectedSource = e.target.instanceState.selectedSource;

            if (e.target.view._totalVisible === 0) {
                e.target.view.$elementContainer.html($('<tr><td colspan="6">' + Craft.t("form-builder", "No entries available") + '</td></tr>'));
            }

            // Update unread count utility nav
            Craft.postActionRequest('form-builder/entries/get-unread-entries', $.proxy(function (response, textStatus) {
                if (textStatus === 'success') {
                    $('#sources .entry-count').html('');

                    $.each(response.grouped, function (key, entries) {
                        $('[data-key="form:' + key + '"]').find('.entry-count').html(entries.length);
                    });

                    if (response.totalCount > 0) {
                        $('.fb-unread-container .fb-badge').addClass('show');
                        $('.fb-unread-container .fb-badge .count').html(response.totalCount);
                        $('#unread-notifications').find('.body').html(response.template);
                    } else {
                        $('.fb-unread-container .fb-badge').removeClass('show');
                        $('.fb-unread-container .fb-badge .count').html('');
                        $('#unread-notifications').find('.body').html('<p class="no-content">' + Craft.t('form-builder', 'No unread submissions.') + '</p>');
                    }
                }
            }, this));

            // if (selectedSource != '*') {
            // Update unread count per form group
            // Craft.postActionRequest('form-builder/entries/get-unread-entries-by-source', { source: selectedSource }, $.proxy(((response, textStatus) => {
            //     console.log(response)
            //     if (textStatus === 'success') {
            // $.each(response.grouped, (key, entries) => {
            //     console.log('Form: ', key)
            //     console.log('Entries: ', entries)
            // })
            // if (response.totalCount > 0) {
            //     $('[data-key="'+selectedSource+'"]').find('.entry-count').html(response.totalCount)
            // } else {
            //     $('[data-key="'+selectedSource+'"]').find('.entry-count').html('')
            // }
            // }
            // }), this))
            // } else {

            // }
        });
    }

    $('.submission-action-trigger').on('click', function (e) {
        e.preventDefault();

        var $menu = void 0;
        var entryId = void 0;
        var fileIds = void 0;
        var formId = void 0;
        var type = void 0;

        type = $(this).data('type');
        formId = $(this).data('form-id');
        entryId = $(this).data('entry-id');
        fileIds = $(this).data('file-ids');
        $menu = $('<div class="tout-dropdown"/>').html('<ul class="form-item-menu">' + '</ul>');

        if (type === 'submission') {
            $('<li><a href="#" class="delete-submission">Delete Submission</a></li>').appendTo($menu.find('ul'));
        } else if (type === 'form') {
            $('<li><a href="' + window.FormBuilder.adminUrl + '/forms/' + formId + '">View Form</a></li>').appendTo($menu.find('ul'));
        } else if (type === 'uploads') {
            $('<li><a href="' + window.FormBuilder.adminUrl + '/entries" class="delete-all-files">Delete All</a></li>').appendTo($menu.find('ul'));
            $('<li><a href="' + window.FormBuilder.adminUrl + '/entries" class="download-all-files">Download All</a></li>').appendTo($menu.find('ul'));
        }

        new Garnish.HUD($(this), $menu, {
            hudClass: 'hud fb-hud submissionhud',
            closeOtherHUDs: false
        });

        $menu.find('.delete-submission').on('click', function (e) {
            e.preventDefault();
            var data = void 0;
            data = {
                id: entryId
            };

            if (confirm(Craft.t("form-builder", "Are you sure you want to delete this entry?"))) {
                Craft.postActionRequest('form-builder/entries/delete', data, $.proxy(function (response, textStatus) {
                    if (textStatus === 'success') {
                        Craft.cp.displayNotice(Craft.t('form-builder', 'Entry deleted'));
                        window.location.href = window.FormBuilder.adminUrl + '/entries';
                    }
                }, this));
            }
        });

        $menu.find('.delete-all-files').on('click', function (e) {
            var data = void 0;
            e.preventDefault();
            data = {
                fileId: fileIds
            };

            if (confirm(Craft.t("form-builder", "Are you sure you want to delete all files?"))) {
                Craft.postActionRequest('assets/deleteFile', data, $.proxy(function (response, textStatus) {
                    var hudID = void 0;
                    if (response.success) {
                        for (hudID in Garnish.HUD.activeHUDs) {
                            Garnish.HUD.activeHUDs[hudID].hide();
                        }

                        $('.upload-details').parent().velocity('fadeOut', {
                            duration: '100'
                        });

                        return setTimeout(function () {
                            return $('.upload-details').parent().remove();
                        }, 100);
                    }
                }, this));
            }
        });

        $menu.find('.download-all-files').on('click', function (e) {
            e.preventDefault();
            var data = void 0;
            Craft.cp.displayNotice(Craft.t('form-builder', 'Downloading...'));
            data = {
                ids: fileIds,
                formId: formId
            };

            Craft.postActionRequest('form-builder/entries/downloadAllFiles', data, $.proxy(function (response, textStatus) {
                var hudID = void 0;
                var results = void 0;
                if (response.success) {
                    window.location = '/actions/form-builder/entries/downloadFiles?filePath=' + response.filePath;
                    Craft.cp.displayNotice(Craft.t('form-builder', 'Download Successful'));
                } else {
                    Craft.cp.displayError(Craft.t('form-builder', response.message));
                }

                results = [];

                for (hudID in Garnish.HUD.activeHUDs) {
                    results.push(Garnish.HUD.activeHUDs[hudID].hide());
                }

                return results;
            }, this));
        });
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTI1NDQ2NjFmYTU3MzM3MjZkZGMiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZW50cmllcy5qcyJdLCJuYW1lcyI6WyJDcmFmdCIsIkZpbGVVcGxvYWRzSW5kZXgiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsIiRjb250YWluZXIiLCIkIiwiZWxlbWVudEluZGV4IiwiaW5pdCIsImNvbnRhaW5lciIsInNldHRpbmdzIiwiJGVsZW1lbnRzIiwic2V0U2V0dGluZ3MiLCJCYXNlRWxlbWVudEluZGV4VmlldyIsImRlZmF1bHRzIiwiJGxvYWRpbmdNb3JlU3Bpbm5lciIsImluc2VydEFmdGVyIiwiJGVsZW1lbnRDb250YWluZXIiLCJnZXRFbGVtZW50Q29udGFpbmVyIiwiY2hpbGRyZW4iLCJjb250ZXh0IiwiYWRkTGlzdGVuZXIiLCJldiIsIiRlbGVtZW50IiwiJHRhcmdldCIsInRhcmdldCIsImhhc0NsYXNzIiwiY2xvc2VzdCIsImxlbmd0aCIsImNyZWF0ZUVsZW1lbnRFZGl0b3IiLCIkdGFibGUiLCJmaW5kIiwiRWxlbWVudEVkaXRvciIsIm9uU2F2ZUVsZW1lbnQiLCJwcm94eSIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCIkZG9jIiwicmVhZHkiLCJvbiIsImUiLCJlbGVtZW50c0NvdW50Iiwic2VsZWN0ZWRTb3VyY2UiLCJ1bnJlYWRJdGVtcyIsInBvc3RBY3Rpb25SZXF1ZXN0IiwicmVzcG9uc2UiLCJ0ZXh0U3RhdHVzIiwic3VjY2VzcyIsIndpbmRvdyIsIkZvcm1CdWlsZGVyIiwidW5yZWFkQ291bnQiLCJjb3VudCIsImh0bWwiLCJpbnN0YW5jZVN0YXRlIiwidmlldyIsIl90b3RhbFZpc2libGUiLCJlYWNoIiwiZ3JvdXBlZCIsImtleSIsImVudHJpZXMiLCJ0b3RhbENvdW50IiwiYWRkQ2xhc3MiLCJ0ZW1wbGF0ZSIsInJlbW92ZUNsYXNzIiwicHJldmVudERlZmF1bHQiLCIkbWVudSIsImVudHJ5SWQiLCJmaWxlSWRzIiwiZm9ybUlkIiwidHlwZSIsImRhdGEiLCJhcHBlbmRUbyIsImFkbWluVXJsIiwiSFVEIiwiaHVkQ2xhc3MiLCJjbG9zZU90aGVySFVEcyIsImlkIiwiY29uZmlybSIsImxvY2F0aW9uIiwiaHJlZiIsImZpbGVJZCIsImh1ZElEIiwiYWN0aXZlSFVEcyIsImhpZGUiLCJwYXJlbnQiLCJ2ZWxvY2l0eSIsImR1cmF0aW9uIiwic2V0VGltZW91dCIsInJlbW92ZSIsImlkcyIsInJlc3VsdHMiLCJmaWxlUGF0aCIsImRpc3BsYXlFcnJvciIsIm1lc3NhZ2UiLCJwdXNoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REFBLE1BQU1DLGdCQUFOLEdBQXlCQyxRQUFRQyxJQUFSLENBQWFDLE1BQWIsQ0FBb0I7QUFDekNDLGdCQUFZQyxFQUFFLGlCQUFGLENBRDZCO0FBRXpDQyxrQkFBYyxJQUYyQjs7QUFJekNDLFFBSnlDLGdCQUlwQ0QsWUFKb0MsRUFJdEJFLFNBSnNCLEVBSVhDLFFBSlcsRUFJRDtBQUNwQyxZQUFJQyxrQkFBSjtBQUNBLGFBQUtKLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsYUFBS0YsVUFBTCxHQUFrQkMsRUFBRUcsU0FBRixDQUFsQjtBQUNBLGFBQUtHLFdBQUwsQ0FBaUJGLFFB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LEVBQXVFakUsRUFBRTRCLEtBQUYsQ0FBUyxVQUFDWSxRQUFELEVBQVdDLFVBQVgsRUFBMEI7QUFDdEcsb0JBQUltQyxjQUFKO0FBQ0Esb0JBQUlTLGdCQUFKO0FBQ0Esb0JBQUk3QyxTQUFTRSxPQUFiLEVBQXNCO0FBQ2xCQywyQkFBTzhCLFFBQVAsNkRBQTBFakMsU0FBUzhDLFFBQW5GO0FBQ0E1RiwwQkFBTW1DLEVBQU4sQ0FBU0MsYUFBVCxDQUF1QnBDLE1BQU1xQyxDQUFOLENBQVEsY0FBUixFQUF3QixxQkFBeEIsQ0FBdkI7QUFDSCxpQkFIRCxNQUdPO0FBQ0hyQywwQkFBTW1DLEVBQU4sQ0FBUzBELFlBQVQsQ0FBc0I3RixNQUFNcUMsQ0FBTixDQUFRLGNBQVIsRUFBd0JTLFNBQVNnRCxPQUFqQyxDQUF0QjtBQUNIOztBQUVESCwwQkFBVSxFQUFWOztBQUVBLHFCQUFLVCxLQUFMLElBQWNoRixRQUFRd0UsR0FBUixDQUFZUyxVQUExQixFQUFzQztBQUNsQ1EsNEJBQVFJLElBQVIsQ0FBYTdGLFFBQVF3RSxHQUFSLENBQVlTLFVBQVosQ0FBdUJELEtBQXZCLEVBQThCRSxJQUE5QixFQUFiO0FBQ0g7O0FBRUQsdUJBQU9PLE9BQVA7QUFDSCxhQWpCc0UsRUFpQm5FLElBakJtRSxDQUF2RTtBQWtCSCxTQTNCRDtBQTZCSCxLQXBHRDtBQXFHSCxDQTNLRCxFIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy9hc3NldHMvanMvZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDkyNTQ0NjYxZmE1NzMzNzI2ZGRjIiwiQ3JhZnQuRmlsZVVwbG9hZHNJbmRleCA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgICRjb250YWluZXI6ICQoJy51cGxvYWQtZGV0YWlscycpLFxuICAgIGVsZW1lbnRJbmRleDogbnVsbCxcblxuICAgIGluaXQoZWxlbWVudEluZGV4LCBjb250YWluZXIsIHNldHRpbmdzKSB7XG4gICAgICAgIGxldCAkZWxlbWVudHM7XG4gICAgICAgIHRoaXMuZWxlbWVudEluZGV4ID0gZWxlbWVudEluZGV4O1xuICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuc2V0U2V0dGluZ3Moc2V0dGluZ3MsIENyYWZ0LkJhc2VFbGVtZW50SW5kZXhWaWV3LmRlZmF1bHRzKTtcbiAgICAgICAgdGhpcy4kbG9hZGluZ01vcmVTcGlubmVyID0gJCgnPGRpdiBjbGFzcz1cImNlbnRlcmFsaWduIGhpZGRlblwiPicgKyAnPGRpdiBjbGFzcz1cInNwaW5uZXIgbG9hZGluZ21vcmVcIj48L2Rpdj4nICsgJzwvZGl2PicpLmluc2VydEFmdGVyKHRoaXMuJGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuJGVsZW1lbnRDb250YWluZXIgPSB0aGlzLmdldEVsZW1lbnRDb250YWluZXIoKTtcbiAgICAgICAgXG4gICAgICAgICRlbGVtZW50cyA9IHRoaXMuJGVsZW1lbnRDb250YWluZXIuY2hpbGRyZW4oKTtcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb250ZXh0ID09PSAnaW5kZXgnKSB7XG4gICAgICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGVsZW1lbnRDb250YWluZXIsICdkYmxjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50O1xuICAgICAgICAgICAgICAgIGxldCAkdGFyZ2V0O1xuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkKGV2LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoJ2VsZW1lbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudCA9ICR0YXJnZXQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQgPSAkdGFyZ2V0LmNsb3Nlc3QoJy5lbGVtZW50Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVFbGVtZW50RWRpdG9yKCRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRFbGVtZW50Q29udGFpbmVyKCkge1xuICAgICAgICB0aGlzLiR0YWJsZSA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCd0YWJsZTpmaXJzdCcpO1xuICAgICAgICB0aGlzLiR0YWJsZS5jaGlsZHJlbigndGJvZHk6Zmlyc3QnKTtcbiAgICB9LFxuXG4gICAgY3JlYXRlRWxlbWVudEVkaXRvcigkZWxlbWVudCkge1xuICAgICAgICBuZXcgQ3JhZnQuRWxlbWVudEVkaXRvcigkZWxlbWVudCwge1xuICAgICAgICAgICAgb25TYXZlRWxlbWVudDogJC5wcm94eSgocmVzcG9uc2UgPT4gQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQXNzZXQgdXBkYXRlZCcpKSksIHRoaXMpXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5HYXJuaXNoLiRkb2MucmVhZHkoKCkgPT4ge1xuICAgIGlmIChDcmFmdC5lbGVtZW50SW5kZXgpIHtcbiAgICAgICAgQ3JhZnQuZWxlbWVudEluZGV4Lm9uKCd1cGRhdGVFbGVtZW50cycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50c0NvdW50O1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkU291cmNlO1xuICAgICAgICAgICAgbGV0IHVucmVhZEl0ZW1zO1xuXG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZ2V0LXVucmVhZC1lbnRyaWVzJywgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LkZvcm1CdWlsZGVyLnVucmVhZENvdW50ID0gcmVzcG9uc2UuY291bnQ7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnLnRvdGFsLWVudHJ5LWNvdW50JykuaHRtbChyZXNwb25zZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnLnRvdGFsLWVudHJ5LWNvdW50JykuaHRtbCgnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpO1xuXG4gICAgICAgICAgICBzZWxlY3RlZFNvdXJjZSA9IGUudGFyZ2V0Lmluc3RhbmNlU3RhdGUuc2VsZWN0ZWRTb3VyY2U7XG5cbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52aWV3Ll90b3RhbFZpc2libGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC52aWV3LiRlbGVtZW50Q29udGFpbmVyLmh0bWwoJChgPHRyPjx0ZCBjb2xzcGFuPVwiNlwiPiR7Q3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIk5vIGVudHJpZXMgYXZhaWxhYmxlXCIpfTwvdGQ+PC90cj5gKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB1bnJlYWQgY291bnQgdXRpbGl0eSBuYXZcbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZW50cmllcy9nZXQtdW5yZWFkLWVudHJpZXMnLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNzb3VyY2VzIC5lbnRyeS1jb3VudCcpLmh0bWwoJycpXG5cbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmdyb3VwZWQsIChrZXksIGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWtleT1cImZvcm06JytrZXkrJ1wiXScpLmZpbmQoJy5lbnRyeS1jb3VudCcpLmh0bWwoZW50cmllcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRvdGFsQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmItdW5yZWFkLWNvbnRhaW5lciAuZmItYmFkZ2UnKS5hZGRDbGFzcygnc2hvdycpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmItdW5yZWFkLWNvbnRhaW5lciAuZmItYmFkZ2UgLmNvdW50JykuaHRtbChyZXNwb25zZS50b3RhbENvdW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3VucmVhZC1ub3RpZmljYXRpb25zJykuZmluZCgnLmJvZHknKS5odG1sKHJlc3BvbnNlLnRlbXBsYXRlKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlIC5jb3VudCcpLmh0bWwoJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjdW5yZWFkLW5vdGlmaWNhdGlvbnMnKS5maW5kKCcuYm9keScpLmh0bWwoJzxwIGNsYXNzPVwibm8tY29udGVudFwiPicrQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vIHVucmVhZCBzdWJtaXNzaW9ucy4nKSsnPC9wPicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpXG5cblxuICAgICAgICAgICAgLy8gaWYgKHNlbGVjdGVkU291cmNlICE9ICcqJykge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB1bnJlYWQgY291bnQgcGVyIGZvcm0gZ3JvdXBcbiAgICAgICAgICAgICAgICAvLyBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZ2V0LXVucmVhZC1lbnRyaWVzLWJ5LXNvdXJjZScsIHsgc291cmNlOiBzZWxlY3RlZFNvdXJjZSB9LCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICQuZWFjaChyZXNwb25zZS5ncm91cGVkLCAoa2V5LCBlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ0Zvcm06ICcsIGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnRW50cmllczogJywgZW50cmllcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAocmVzcG9uc2UudG90YWxDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAkKCdbZGF0YS1rZXk9XCInK3NlbGVjdGVkU291cmNlKydcIl0nKS5maW5kKCcuZW50cnktY291bnQnKS5odG1sKHJlc3BvbnNlLnRvdGFsQ291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICQoJ1tkYXRhLWtleT1cIicrc2VsZWN0ZWRTb3VyY2UrJ1wiXScpLmZpbmQoJy5lbnRyeS1jb3VudCcpLmh0bWwoJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyB9KSwgdGhpcykpXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJCgnLnN1Ym1pc3Npb24tYWN0aW9uLXRyaWdnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCAkbWVudTtcbiAgICAgICAgbGV0IGVudHJ5SWQ7XG4gICAgICAgIGxldCBmaWxlSWRzO1xuICAgICAgICBsZXQgZm9ybUlkO1xuICAgICAgICBsZXQgdHlwZTtcblxuICAgICAgICB0eXBlID0gJCh0aGlzKS5kYXRhKCd0eXBlJyk7XG4gICAgICAgIGZvcm1JZCA9ICQodGhpcykuZGF0YSgnZm9ybS1pZCcpO1xuICAgICAgICBlbnRyeUlkID0gJCh0aGlzKS5kYXRhKCdlbnRyeS1pZCcpO1xuICAgICAgICBmaWxlSWRzID0gJCh0aGlzKS5kYXRhKCdmaWxlLWlkcycpO1xuICAgICAgICAkbWVudSA9ICQoJzxkaXYgY2xhc3M9XCJ0b3V0LWRyb3Bkb3duXCIvPicpLmh0bWwoJzx1bCBjbGFzcz1cImZvcm0taXRlbS1tZW51XCI+JyArICc8L3VsPicpO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc3VibWlzc2lvbicpIHtcbiAgICAgICAgICAgICQoJzxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiZGVsZXRlLXN1Ym1pc3Npb25cIj5EZWxldGUgU3VibWlzc2lvbjwvYT48L2xpPicpLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmb3JtJykge1xuICAgICAgICAgICAgJChgPGxpPjxhIGhyZWY9XCIke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZm9ybXMvJHtmb3JtSWR9XCI+VmlldyBGb3JtPC9hPjwvbGk+YCkuYXBwZW5kVG8oJG1lbnUuZmluZCgndWwnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3VwbG9hZHMnKSB7XG4gICAgICAgICAgICAkKGA8bGk+PGEgaHJlZj1cIiR7d2luZG93LkZvcm1CdWlsZGVyLmFkbWluVXJsfS9lbnRyaWVzXCIgY2xhc3M9XCJkZWxldGUtYWxsLWZpbGVzXCI+RGVsZXRlIEFsbDwvYT48L2xpPmApLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICAgICAgJChgPGxpPjxhIGhyZWY9XCIke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZW50cmllc1wiIGNsYXNzPVwiZG93bmxvYWQtYWxsLWZpbGVzXCI+RG93bmxvYWQgQWxsPC9hPjwvbGk+YCkuYXBwZW5kVG8oJG1lbnUuZmluZCgndWwnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXcgR2FybmlzaC5IVUQoJCh0aGlzKSwgJG1lbnUsIHtcbiAgICAgICAgICAgIGh1ZENsYXNzOiAnaHVkIGZiLWh1ZCBzdWJtaXNzaW9uaHVkJyxcbiAgICAgICAgICAgIGNsb3NlT3RoZXJIVURzOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICAkbWVudS5maW5kKCcuZGVsZXRlLXN1Ym1pc3Npb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgIGlkOiBlbnRyeUlkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoY29uZmlybShDcmFmdC50KFwiZm9ybS1idWlsZGVyXCIsIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGVudHJ5P1wiKSkpIHtcbiAgICAgICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZGVsZXRlJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0VudHJ5IGRlbGV0ZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZW50cmllc2A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSwgdGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkbWVudS5maW5kKCcuZGVsZXRlLWFsbC1maWxlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBkYXRhO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgZmlsZUlkOiBmaWxlSWRzXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoY29uZmlybShDcmFmdC50KFwiZm9ybS1idWlsZGVyXCIsIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBhbGwgZmlsZXM/XCIpKSkge1xuICAgICAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdhc3NldHMvZGVsZXRlRmlsZScsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaHVkSUQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGh1ZElEIGluIEdhcm5pc2guSFVELmFjdGl2ZUhVRHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYXJuaXNoLkhVRC5hY3RpdmVIVURzW2h1ZElEXS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy51cGxvYWQtZGV0YWlscycpLnBhcmVudCgpLnZlbG9jaXR5KCdmYWRlT3V0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAnMTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKCkgPT4gJCgnLnVwbG9hZC1kZXRhaWxzJykucGFyZW50KCkucmVtb3ZlKCkpLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG1lbnUuZmluZCgnLmRvd25sb2FkLWFsbC1maWxlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBkYXRhO1xuICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnRG93bmxvYWRpbmcuLi4nKSk7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICBpZHM6IGZpbGVJZHMsXG4gICAgICAgICAgICAgIGZvcm1JZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9lbnRyaWVzL2Rvd25sb2FkQWxsRmlsZXMnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaHVkSUQ7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gYC9hY3Rpb25zL2Zvcm0tYnVpbGRlci9lbnRyaWVzL2Rvd25sb2FkRmlsZXM/ZmlsZVBhdGg9JHtyZXNwb25zZS5maWxlUGF0aH1gO1xuICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdEb3dubG9hZCBTdWNjZXNzZnVsJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlFcnJvcihDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCByZXNwb25zZS5tZXNzYWdlKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChodWRJRCBpbiBHYXJuaXNoLkhVRC5hY3RpdmVIVURzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChHYXJuaXNoLkhVRC5hY3RpdmVIVURzW2h1ZElEXS5oaWRlKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL2VudHJpZXMuanMiXSwic291cmNlUm9vdCI6IiJ9