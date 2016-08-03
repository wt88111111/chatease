﻿(function(chatease) {
	var utils = chatease.utils,
		events = chatease.events,
		embed = chatease.embed,
		core = chatease.core,
		states = core.states,
		renders = core.renders,
		renderModes = renders.modes,
		css = utils.css,
		
		WRAP_CLASS = 'chatwrap';
	
	core.view = function(entity, model) {
		var _this = utils.extend(this, new events.eventdispatcher('core.view')),
			_wrapper,
			_render,
			_errorState = false;
		
		function _init() {
			_wrapper = utils.createElement('div', WRAP_CLASS);
			_wrapper.id = entity.id;
			_wrapper.tabIndex = 0;
			
			var replace = document.getElementById(entity.id);
			replace.parentNode.replaceChild(_wrapper, replace);
		}
		
		_this.setup = function() {
			_setupRender();
			try {
				_wrapper.addEventListener('keydown', _onKeyDown);
			} catch(e) {
				_wrapper.attachEvent('onkeydown', _onKeyDown);
			}
			
			setTimeout(function() {
				window.onresize = function(e) {
					_this.resize();
				};
				_this.resize(model.width, model.height);
				_this.dispatchEvent(events.chatease_READY, { channelId: entity.id });
			}, 0);
		};
		
		function _setupRender() {
			switch (model.renderMode) {
				case renderModes.DEFAULT:
					var renderConf = utils.extend(model.getConfig('render'), { id: model.id, width: model.width, height: model.height, maxlog: model.maxlog });
					_this.render = _render = new renders[renderModes.DEFAULT](_this, renderConf);
					break;
				default:
					_this.dispatchEvent(events.chatease_SETUP_ERROR, { message: 'Unknown render mode!', render: model.renderMode });
					break;
			}
			
			if (_render) {
				_render.addEventListener(events.chatease_VIEW_SEND, _onSend);
				_render.addEventListener(events.chatease_VIEW_SHIELDMSG, _onShieldMsg);
				_render.addEventListener(events.chatease_VIEW_CLEARSCREEN, _onClearScreen);
				_render.addEventListener(events.chatease_VIEW_NICKCLICK, _onNickClick);
				_render.addEventListener(events.chatease_RENDER_ERROR, _onRenderError);
				_wrapper.appendChild(_render.element());
			}
		}
		
		function _onSend(e) {
			_forward(e);
		}
		
		function _onShieldMsg(e) {
			_forward(e);
		}
		
		function _onClearScreen(e) {
			_forward(e);
		}
		
		function _onNickClick(e) {
			_forward(e);
		}
		
		function _onRenderError(e) {
			_forward(e);
		}
		
		function _forward(e) {
			_this.dispatchEvent(e.type, e);
		}
		
		function _onKeyDown(e) {
			if (e.ctrlKey || e.metaKey) {
				return true;
			}
			
			switch (e.keyCode) {
				case 13: // enter
					_render.send();
					break;
				default:
					break;
			}
			
			if (/13/.test(e.keyCode)) {
				// Prevent keypresses from scrolling the screen
				e.preventDefault ? e.preventDefault() : e.returnValue = false;
				return false;
			}
		}
		
		_this.show = function(message, user) {
			if (model.shieldMsg) {
				return;
			}
			if (_render) {
				_render.show(message, user);
			}
		};
		
		_this.user = function() {
			return model.user;
		};
		
		_this.resize = function(width, height) {
			if (_render) 
				_render.resize(width, height);
		};
		
		_this.destroy = function() {
			if (_wrapper) {
				_wrapper.removeEventListener('keydown', _onKeyDown);
			}
			if (_render) {
				_render.destroy();
			}
		};
		
		_init();
	};
})(chatease);
