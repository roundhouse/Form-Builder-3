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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),

/***/ 7:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzEzNjUyZWUyZmU0ZWU2NzE0ZGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0YnVuZGxlcy9lbnRyaWVzL3NyYy9qcy9lbnRyaWVzLmpzIl0sIm5hbWVzIjpbIkNyYWZ0IiwiRmlsZVVwbG9hZHNJbmRleCIsIkdhcm5pc2giLCJCYXNlIiwiZXh0ZW5kIiwiJGNvbnRhaW5lciIsIiQiLCJlbGVtZW50SW5kZXgiLCJpbml0IiwiY29udGFpbmVyIiwic2V0dGluZ3MiLCIkZWxlbWVudHMiLCJzZXRTZXR0aW5ncyIsIkJhc2VFbGVtZW50SW5kZXhWaWV3IiwiZGVmYXVsdHMiLCIkbG9hZGluZ01vcmVTcGlubmVyIiwiaW5zZXJ0QWZ0ZXIiLCIkZWxlbWVudENvbnRhaW5lciIsImdldEVsZW1lbnRDb250YWluZXIiLCJjaGlsZHJlbiIsImNvbnRleHQiLCJhZGRMaXN0ZW5lciIsImV2IiwiJGVsZW1lbnQiLCIkdGFyZ2V0IiwidGFyZ2V0IiwiaGFzQ2xhc3MiLCJjbG9zZXN0IiwibGVuZ3RoIiwiY3JlYXRlRWxlbWVudEVkaXRvciIsIiR0YWJsZSIsImZpbmQiLCJFbGVtZW50RWRpdG9yIiwib25TYXZlRWxlbWVudCIsInByb3h5IiwiY3AiLCJkaXNwbGF5Tm90aWNlIiwidCIsIiRkb2MiLCJyZWFkeSIsIm9uIiwiZSIsImVsZW1lbnRzQ291bnQiLCJzZWxlY3RlZFNvdXJjZSIsInVucmVhZEl0ZW1zIiwicG9zdEFjdGlvblJlcXVlc3QiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJzdWNjZXNzIiwid2luZG93IiwiRm9ybUJ1aWxkZXIiLCJ1bnJlYWRDb3VudCIsImNvdW50IiwiaHRtbCIsImluc3RhbmNlU3RhdGUiLCJ2aWV3IiwiX3RvdGFsVmlzaWJsZSIsImVhY2giLCJncm91cGVkIiwia2V5IiwiZW50cmllcyIsInRvdGFsQ291bnQiLCJhZGRDbGFzcyIsInRlbXBsYXRlIiwicmVtb3ZlQ2xhc3MiLCJwcmV2ZW50RGVmYXVsdCIsIiRtZW51IiwiZW50cnlJZCIsImZpbGVJZHMiLCJmb3JtSWQiLCJ0eXBlIiwiZGF0YSIsImFwcGVuZFRvIiwiYWRtaW5VcmwiLCJIVUQiLCJodWRDbGFzcyIsImNsb3NlT3RoZXJIVURzIiwiaWQiLCJjb25maXJtIiwibG9jYXRpb24iLCJocmVmIiwiZmlsZUlkIiwiaHVkSUQiLCJhY3RpdmVIVURzIiwiaGlkZSIsInBhcmVudCIsInZlbG9jaXR5IiwiZHVyYXRpb24iLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiaWRzIiwicmVzdWx0cyIsImZpbGVQYXRoIiwiZGlzcGxheUVycm9yIiwibWVzc2FnZSIsInB1c2giXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQUEsTUFBTUMsZ0JBQU4sR0FBeUJDLFFBQVFDLElBQVIsQ0FBYUMsTUFBYixDQUFvQjtBQUN6Q0MsZ0JBQVlDLEVBQUUsaUJBQUYsQ0FENkI7QUFFekNDLGtCQUFjLElBRjJCOztBQUl6Q0MsUUFKeUMsZ0JBSXBDRCxZQUpvQyxFQUl0QkUsU0FKc0IsRUFJWEMsUUFKVyxFQUlEO0FBQ3BDLFlBQUlDLGtCQUFKO0FBQ0EsYUFBS0osWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxhQUFLRixVQUFMLEdBQWtCQyxFQUFFRyxTQUFGLENBQWxCO0FBQ0EsYUFB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QXhCLEVBQWlFMEIsSUFBakUsRUFBdUVqRSxFQUFFNEIsS0FBRixDQUFTLFVBQUNZLFFBQUQsRUFBV0MsVUFBWCxFQUEwQjtBQUN0RyxvQkFBSW1DLGNBQUo7QUFDQSxvQkFBSVMsZ0JBQUo7QUFDQSxvQkFBSTdDLFNBQVNFLE9BQWIsRUFBc0I7QUFDbEJDLDJCQUFPOEIsUUFBUCw2REFBMEVqQyxTQUFTOEMsUUFBbkY7QUFDQTVGLDBCQUFNbUMsRUFBTixDQUFTQyxhQUFULENBQXVCcEMsTUFBTXFDLENBQU4sQ0FBUSxjQUFSLEVBQXdCLHFCQUF4QixDQUF2QjtBQUNILGlCQUhELE1BR087QUFDSHJDLDBCQUFNbUMsRUFBTixDQUFTMEQsWUFBVCxDQUFzQjdGLE1BQU1xQyxDQUFOLENBQVEsY0FBUixFQUF3QlMsU0FBU2dELE9BQWpDLENBQXRCO0FBQ0g7O0FBRURILDBCQUFVLEVBQVY7O0FBRUEscUJBQUtULEtBQUwsSUFBY2hGLFFBQVF3RSxHQUFSLENBQVlTLFVBQTFCLEVBQXNDO0FBQ2xDUSw0QkFBUUksSUFBUixDQUFhN0YsUUFBUXdFLEdBQVIsQ0FBWVMsVUFBWixDQUF1QkQsS0FBdkIsRUFBOEJFLElBQTlCLEVBQWI7QUFDSDs7QUFFRCx1QkFBT08sT0FBUDtBQUNILGFBakJzRSxFQWlCbkUsSUFqQm1FLENBQXZFO0FBa0JILFNBM0JEO0FBNkJILEtBcEdEO0FBcUdILENBM0tELEUiLCJmaWxlIjoiL3NyYy9hc3NldGJ1bmRsZXMvZW50cmllcy9kaXN0L2pzL2VudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MTM2NTJlZTJmZTRlZTY3MTRkYyIsIkNyYWZ0LkZpbGVVcGxvYWRzSW5kZXggPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiAkKCcudXBsb2FkLWRldGFpbHMnKSxcbiAgICBlbGVtZW50SW5kZXg6IG51bGwsXG5cbiAgICBpbml0KGVsZW1lbnRJbmRleCwgY29udGFpbmVyLCBzZXR0aW5ncykge1xuICAgICAgICBsZXQgJGVsZW1lbnRzO1xuICAgICAgICB0aGlzLmVsZW1lbnRJbmRleCA9IGVsZW1lbnRJbmRleDtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChjb250YWluZXIpO1xuICAgICAgICB0aGlzLnNldFNldHRpbmdzKHNldHRpbmdzLCBDcmFmdC5CYXNlRWxlbWVudEluZGV4Vmlldy5kZWZhdWx0cyk7XG4gICAgICAgIHRoaXMuJGxvYWRpbmdNb3JlU3Bpbm5lciA9ICQoJzxkaXYgY2xhc3M9XCJjZW50ZXJhbGlnbiBoaWRkZW5cIj4nICsgJzxkaXYgY2xhc3M9XCJzcGlubmVyIGxvYWRpbmdtb3JlXCI+PC9kaXY+JyArICc8L2Rpdj4nKS5pbnNlcnRBZnRlcih0aGlzLiRjb250YWluZXIpO1xuICAgICAgICB0aGlzLiRlbGVtZW50Q29udGFpbmVyID0gdGhpcy5nZXRFbGVtZW50Q29udGFpbmVyKCk7XG4gICAgICAgIFxuICAgICAgICAkZWxlbWVudHMgPSB0aGlzLiRlbGVtZW50Q29udGFpbmVyLmNoaWxkcmVuKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udGV4dCA9PT0gJ2luZGV4Jykge1xuICAgICAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRlbGVtZW50Q29udGFpbmVyLCAnZGJsY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudDtcbiAgICAgICAgICAgICAgICBsZXQgJHRhcmdldDtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJChldi50YXJnZXQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICgkdGFyZ2V0Lmhhc0NsYXNzKCdlbGVtZW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQgPSAkdGFyZ2V0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJHRhcmdldC5jbG9zZXN0KCcuZWxlbWVudCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRWxlbWVudEVkaXRvcigkZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0RWxlbWVudENvbnRhaW5lcigpIHtcbiAgICAgICAgdGhpcy4kdGFibGUgPSB0aGlzLiRjb250YWluZXIuZmluZCgndGFibGU6Zmlyc3QnKTtcbiAgICAgICAgdGhpcy4kdGFibGUuY2hpbGRyZW4oJ3Rib2R5OmZpcnN0Jyk7XG4gICAgfSxcblxuICAgIGNyZWF0ZUVsZW1lbnRFZGl0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgbmV3IENyYWZ0LkVsZW1lbnRFZGl0b3IoJGVsZW1lbnQsIHtcbiAgICAgICAgICAgIG9uU2F2ZUVsZW1lbnQ6ICQucHJveHkoKHJlc3BvbnNlID0+IENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0Fzc2V0IHVwZGF0ZWQnKSkpLCB0aGlzKVxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuR2FybmlzaC4kZG9jLnJlYWR5KCgpID0+IHtcbiAgICBpZiAoQ3JhZnQuZWxlbWVudEluZGV4KSB7XG4gICAgICAgIENyYWZ0LmVsZW1lbnRJbmRleC5vbigndXBkYXRlRWxlbWVudHMnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudHNDb3VudDtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFNvdXJjZTtcbiAgICAgICAgICAgIGxldCB1bnJlYWRJdGVtcztcblxuICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9lbnRyaWVzL2dldC11bnJlYWQtZW50cmllcycsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5Gb3JtQnVpbGRlci51bnJlYWRDb3VudCA9IHJlc3BvbnNlLmNvdW50O1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJy50b3RhbC1lbnRyeS1jb3VudCcpLmh0bWwocmVzcG9uc2UuY291bnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJy50b3RhbC1lbnRyeS1jb3VudCcpLmh0bWwoJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHRoaXMpKTtcblxuICAgICAgICAgICAgc2VsZWN0ZWRTb3VyY2UgPSBlLnRhcmdldC5pbnN0YW5jZVN0YXRlLnNlbGVjdGVkU291cmNlO1xuXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmlldy5fdG90YWxWaXNpYmxlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQudmlldy4kZWxlbWVudENvbnRhaW5lci5odG1sKCQoYDx0cj48dGQgY29sc3Bhbj1cIjZcIj4ke0NyYWZ0LnQoXCJmb3JtLWJ1aWxkZXJcIiwgXCJObyBlbnRyaWVzIGF2YWlsYWJsZVwiKX08L3RkPjwvdHI+YCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdW5yZWFkIGNvdW50IHV0aWxpdHkgbmF2XG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZ2V0LXVucmVhZC1lbnRyaWVzJywgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICAkKCcjc291cmNlcyAuZW50cnktY291bnQnKS5odG1sKCcnKVxuXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZS5ncm91cGVkLCAoa2V5LCBlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1rZXk9XCJmb3JtOicra2V5KydcIl0nKS5maW5kKCcuZW50cnktY291bnQnKS5odG1sKGVudHJpZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS50b3RhbENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlJykuYWRkQ2xhc3MoJ3Nob3cnKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlIC5jb3VudCcpLmh0bWwocmVzcG9uc2UudG90YWxDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN1bnJlYWQtbm90aWZpY2F0aW9ucycpLmZpbmQoJy5ib2R5JykuaHRtbChyZXNwb25zZS50ZW1wbGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYi11bnJlYWQtY29udGFpbmVyIC5mYi1iYWRnZScpLnJlbW92ZUNsYXNzKCdzaG93JylcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYi11bnJlYWQtY29udGFpbmVyIC5mYi1iYWRnZSAuY291bnQnKS5odG1sKCcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3VucmVhZC1ub3RpZmljYXRpb25zJykuZmluZCgnLmJvZHknKS5odG1sKCc8cCBjbGFzcz1cIm5vLWNvbnRlbnRcIj4nK0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdObyB1bnJlYWQgc3VibWlzc2lvbnMuJykrJzwvcD4nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHRoaXMpKVxuXG5cbiAgICAgICAgICAgIC8vIGlmIChzZWxlY3RlZFNvdXJjZSAhPSAnKicpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdW5yZWFkIGNvdW50IHBlciBmb3JtIGdyb3VwXG4gICAgICAgICAgICAgICAgLy8gQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9lbnRyaWVzL2dldC11bnJlYWQtZW50cmllcy1ieS1zb3VyY2UnLCB7IHNvdXJjZTogc2VsZWN0ZWRTb3VyY2UgfSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAkLmVhY2gocmVzcG9uc2UuZ3JvdXBlZCwgKGtleSwgZW50cmllcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdGb3JtOiAnLCBrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ0VudHJpZXM6ICcsIGVudHJpZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHJlc3BvbnNlLnRvdGFsQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgJCgnW2RhdGEta2V5PVwiJytzZWxlY3RlZFNvdXJjZSsnXCJdJykuZmluZCgnLmVudHJ5LWNvdW50JykuaHRtbChyZXNwb25zZS50b3RhbENvdW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAkKCdbZGF0YS1rZXk9XCInK3NlbGVjdGVkU291cmNlKydcIl0nKS5maW5kKCcuZW50cnktY291bnQnKS5odG1sKCcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgLy8gfSksIHRoaXMpKVxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5zdWJtaXNzaW9uLWFjdGlvbi10cmlnZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgJG1lbnU7XG4gICAgICAgIGxldCBlbnRyeUlkO1xuICAgICAgICBsZXQgZmlsZUlkcztcbiAgICAgICAgbGV0IGZvcm1JZDtcbiAgICAgICAgbGV0IHR5cGU7XG5cbiAgICAgICAgdHlwZSA9ICQodGhpcykuZGF0YSgndHlwZScpO1xuICAgICAgICBmb3JtSWQgPSAkKHRoaXMpLmRhdGEoJ2Zvcm0taWQnKTtcbiAgICAgICAgZW50cnlJZCA9ICQodGhpcykuZGF0YSgnZW50cnktaWQnKTtcbiAgICAgICAgZmlsZUlkcyA9ICQodGhpcykuZGF0YSgnZmlsZS1pZHMnKTtcbiAgICAgICAgJG1lbnUgPSAkKCc8ZGl2IGNsYXNzPVwidG91dC1kcm9wZG93blwiLz4nKS5odG1sKCc8dWwgY2xhc3M9XCJmb3JtLWl0ZW0tbWVudVwiPicgKyAnPC91bD4nKTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pc3Npb24nKSB7XG4gICAgICAgICAgICAkKCc8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImRlbGV0ZS1zdWJtaXNzaW9uXCI+RGVsZXRlIFN1Ym1pc3Npb248L2E+PC9saT4nKS5hcHBlbmRUbygkbWVudS5maW5kKCd1bCcpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZm9ybScpIHtcbiAgICAgICAgICAgICQoYDxsaT48YSBocmVmPVwiJHt3aW5kb3cuRm9ybUJ1aWxkZXIuYWRtaW5Vcmx9L2Zvcm1zLyR7Zm9ybUlkfVwiPlZpZXcgRm9ybTwvYT48L2xpPmApLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1cGxvYWRzJykge1xuICAgICAgICAgICAgJChgPGxpPjxhIGhyZWY9XCIke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZW50cmllc1wiIGNsYXNzPVwiZGVsZXRlLWFsbC1maWxlc1wiPkRlbGV0ZSBBbGw8L2E+PC9saT5gKS5hcHBlbmRUbygkbWVudS5maW5kKCd1bCcpKTtcbiAgICAgICAgICAgICQoYDxsaT48YSBocmVmPVwiJHt3aW5kb3cuRm9ybUJ1aWxkZXIuYWRtaW5Vcmx9L2VudHJpZXNcIiBjbGFzcz1cImRvd25sb2FkLWFsbC1maWxlc1wiPkRvd25sb2FkIEFsbDwvYT48L2xpPmApLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3IEdhcm5pc2guSFVEKCQodGhpcyksICRtZW51LCB7XG4gICAgICAgICAgICBodWRDbGFzczogJ2h1ZCBmYi1odWQgc3VibWlzc2lvbmh1ZCcsXG4gICAgICAgICAgICBjbG9zZU90aGVySFVEczogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG1lbnUuZmluZCgnLmRlbGV0ZS1zdWJtaXNzaW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICBpZDogZW50cnlJZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oQ3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBlbnRyeT9cIikpKSB7XG4gICAgICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9lbnRyaWVzL2RlbGV0ZScsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdFbnRyeSBkZWxldGVkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHt3aW5kb3cuRm9ybUJ1aWxkZXIuYWRtaW5Vcmx9L2VudHJpZXNgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG1lbnUuZmluZCgnLmRlbGV0ZS1hbGwtZmlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgIGZpbGVJZDogZmlsZUlkc1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oQ3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgYWxsIGZpbGVzP1wiKSkpIHtcbiAgICAgICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnYXNzZXRzL2RlbGV0ZUZpbGUnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh1ZElEO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChodWRJRCBpbiBHYXJuaXNoLkhVRC5hY3RpdmVIVURzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FybmlzaC5IVUQuYWN0aXZlSFVEc1todWRJRF0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcudXBsb2FkLWRldGFpbHMnKS5wYXJlbnQoKS52ZWxvY2l0eSgnZmFkZU91dCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogJzEwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCgpID0+ICQoJy51cGxvYWQtZGV0YWlscycpLnBhcmVudCgpLnJlbW92ZSgpKSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRtZW51LmZpbmQoJy5kb3dubG9hZC1hbGwtZmlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0Rvd25sb2FkaW5nLi4uJykpO1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgaWRzOiBmaWxlSWRzLFxuICAgICAgICAgICAgICBmb3JtSWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZW50cmllcy9kb3dubG9hZEFsbEZpbGVzJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGh1ZElEO1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHRzO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGAvYWN0aW9ucy9mb3JtLWJ1aWxkZXIvZW50cmllcy9kb3dubG9hZEZpbGVzP2ZpbGVQYXRoPSR7cmVzcG9uc2UuZmlsZVBhdGh9YDtcbiAgICAgICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnRG93bmxvYWQgU3VjY2Vzc2Z1bCcpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5RXJyb3IoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgcmVzcG9uc2UubWVzc2FnZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAoaHVkSUQgaW4gR2FybmlzaC5IVUQuYWN0aXZlSFVEcykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goR2FybmlzaC5IVUQuYWN0aXZlSFVEc1todWRJRF0uaGlkZSgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRidW5kbGVzL2VudHJpZXMvc3JjL2pzL2VudHJpZXMuanMiXSwic291cmNlUm9vdCI6IiJ9