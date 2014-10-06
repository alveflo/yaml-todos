angular.module('todoApp', [])
	.controller('mainCtrl', ['$scope', function($scope, $http) {
		$scope.todos = [];

		var code = '<h4>Oops!</h4><p>##MESSAGE##</p>';
		code += '<div class="highlight">';
		code += '<pre>';
		code += '<code class="html">';
		code += '<span>';
		code += '##CODE##';
		code += '</span>';
		code += '</code>';
		code += '</pre>';
		code += '</div>';

		var yaml = 'todos:<br/>';
		yaml += '&nbsp;&nbsp;- name: description<br/>';
		yaml += '&nbsp;&nbsp;- name: description<br/>';
		yaml += '&nbsp;&nbsp;- name: description<br/>';


		var addData = function(data) {
			$scope.todos.push(data);
			$scope.$apply();
		}

		$scope.init = function() {
			var client = new WebSocket('ws://localhost:81/todos');
			client.onerror = function(e) {
				$('#error').html('<h4>Oops!</h4>Unable to connect to localhost:81.')
				$('#error').show();
			};
			client.onmessage = function(msg) {
				$scope.todos.length = 0;
				$scope.$apply();
				$('#error').hide();
				var data = JSON.parse(msg.data);
				if (data.error != null) {
					$('#error').html(code.replace('##MESSAGE##', 'Something went wrong...').replace('##CODE##', data.error.message));
					$('#error').show();
				}
				else {
					try {
						var raw = data.todos;
						for (var todo in raw) {
							var keys = Object.keys(raw[todo]);
							for (var key in keys) {
								var temp = {};
								temp.name = keys[key];
								temp.desc = raw[todo][keys[key]];
								addData(temp);
							}
						}
					} catch (e) {
						$('#error').html(code.replace('##MESSAGE##', 'Unable to parse YAML input.<br/>Valid input format:').replace('##CODE##', yaml));
						$('#error').show();
					}
				}
			}
		};
		$scope.init();
	}]);