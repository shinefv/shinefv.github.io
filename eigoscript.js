
		var array_s = [];
		var ans;
		var count_r = 0;
		var count_t = 0;
		var incorrect = [];
		
		var lustyle = ""
		var maru = "background-color: #00ff00;  "; 
		var batu = "background-color: #ff0000;  "; 
		
		getCSVFile();
        function getCSVFile() {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                createArray(xhr.responseText);
				startGame();
            };
		//input CSV file.
            xhr.open("get", eigofile, true);
            xhr.send(null);
        }
        

        function createXMLHttpRequest() {
            var XMLhttpObject = null;
            XMLhttpObject = new XMLHttpRequest();
            return XMLhttpObject;
        }

        function createArray(csvData) {
            var tempArray = csvData.split("\n");
            var csvArray = new Array();
            for (var i = 0; i < tempArray.length; i++) {
				if(tempArray[i].split("@").length > 1) {
					csvArray[i] = tempArray[i].split("@");
					console.log(csvArray[i]);
				}
            
            }
            array_s = csvArray;

        }
		
		function startGame() {
			window.setTimeout("printResult()", 60000);
			
			initGame();
			createQ();
		
		}
		
		function initGame() {
			count_r = 0;
			count_t = 0;
			incorrect.length = 0;
			document.getElementById("Result").style.display = "none";
			document.getElementById("replay").style.display = "none";
		}
		
		function createQ() {
			var q;
			var op = [];
			
			initOp();
			
			q = Math.floor( Math.random() * array_s.length );
			op.push(q);
			for(var i = 1; i < 4; i++) {
				var r;
				while(1) {
					r = Math.floor( Math.random() * array_s.length );
					

					
					if(!inArray(op, r)) {
						op.push(r);
						break;
					}
					
					
				}
			}
			
			for(var i = 0; i < 100; i++) {
				var a,b,s;
				a = Math.floor( Math.random() * op.length);
				b = Math.floor( Math.random() * op.length);
				
				s = op[a];
				op[a] = op[b];
				op[b] = s;
			}
			console.log("sq");
			
			printOp(q, op);
		}
		
		function printOp(q, op) {
			var qtxt, b = [];
			
			var opul = document.getElementById("opul");
			for(var i = 0; i < 4; i++) {
				b.push(opul.children[i]);
			}
			qtxt = document.getElementById("Qtxt");
			qtxt.innerHTML = array_s[q][0];
			for(var i = 0; i < 4; i++) {
				b[i].children[0].innerHTML = array_s[op[i]][1];
				if(op[i] == q) {
					ans = b[i].children[0];
				}
				b[i].children[0].onclick = function(e) {
					
					printAns(q, e);
				};
			}
		}
		
		function printAns(q, b) {
		
			invClick();
			if(ans == b.target) {
				//ans.style = lustyle + maru;
				ans.style.backgroundColor = "#00ff00";
				
				count_t++;
				console.log("正解");
			} else {
				//b.target.style = lustyle + batu;
				b.target.style.backgroundColor = "#ff0000";
				ans.style.backgroundColor = "#00ff00";
				//ans.style = lustyle + maru;
				if(!inArray(incorrect, array_s[q])) {
					incorrect.push(array_s[q]);
				}
				
				console.log("不正解");
			}
			count_r++;
			window.setTimeout("createQ()", 500);
			
			
		}
		
		function inArray(array, key) {
			for(var i = 0; i < array.length; i++) {
				if(array[i] == key) {
					return 1;
				}
			}
			return 0;
		}
		
		function invClick() {
			var ul = document.getElementById("opul");
			
			
			for(var i = 0; i < 4; i++) {
				ul.children[i].children[0].onclick = null;
			}
		}
		
		function initOp() {
			var b;
			
			b = document.getElementById("opul");
			for(var i = 0; i < 4; i++) {
				b.children[i].children[0].style = lustyle;
				b.children[i].children[0].style.backgroundColor = "";
			}
		}
		
		function printResult() {
			var result = document.getElementById("Result");
			result.style.display = "block";
			var replay = document.getElementById("replay");
			replay.style.display = "inline";
			
			
			document.getElementById("Qtxt").style.display = "none";
			document.getElementById("Op").style.display = "none";
			
			result.innerHTML = count_r + " 問中 " + count_t + "問正解<br>不正解だった単語<br>";
			result.style = "font-size: 200%; text-align: center;";
			
			for(var i = 0; i < incorrect.length; i++) {
				result.innerHTML = result.innerHTML + incorrect[i][0] + " " + incorrect[i][1] + "<br>";
			}
			
			replay.onclick = function(e) {
				document.getElementById("Qtxt").style.display = "block";
				document.getElementById("Op").style.display = "block";
				result.style.display = "none";
				replay.style.display = "none";
				
				startGame();
			}
			
			
		}
