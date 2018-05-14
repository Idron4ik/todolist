function out(todo){
	var taskContainer = document.querySelector(".task-container");
	var out = "";
	for(var key in todo){
		out +="<li class=\"task-item\" data-item=\""+key+"\">\
				<div class=\"task\">"+todo[key]+"</div>\
				<button class=\"btn edit\">edit</button>\
				<button class=\"btn delet\">delet</button>\
			</li>"
		taskContainer.innerHTML = out;
	}
}
		


window.onload = function(){
	var text = document.querySelector(".text");
	var todo = ["Зробити Куруцу", "Написати Гидеона", "Випеть чаю","Придумати новий колір","Допомогти Илону Маску", "Спасти Єнотів"];
	
	if(localStorage.getItem("todo") != undefined){
		todo = JSON.parse(localStorage.getItem("todo"));
		out(todo);
	}

	document.querySelector(".send").onclick = function(){
		todo.push(text.value);
		localStorage.setItem("todo", JSON.stringify(todo));
		out(todo);
	}
	document.querySelector(".task-container").onclick = function(e){
		
		if(e.target.classList.contains("delet")){
			var elem = e.target.parentElement;
			var item = elem.getAttribute("data-item");
			todo.splice(item, 1);
			localStorage.setItem("todo", JSON.stringify(todo));
			elem.style.display = "none";
		}
		if(e.target.classList.contains("edit")){
			var textArea = document.createElement("TEXTAREA");
			var text = e.target.parentElement.children[0].innerHTML;
			var elem = e.target.parentElement.children[0];

			elem.innerHTML="<textarea class='textarea'>"+text+"</textarea>";
			
			var save = document.createElement("BUTTON");
			save.innerHTML = "save";
			save.className = "btn save";

			elem.parentElement.appendChild(save);

		}
		if(e.target.classList.contains("save")){
			var value = document.querySelector(".textarea");
			value.style.display ="none";
			

			var text = e.target.parentElement.children[0].innerHTML = value.value;
			e.target.style.display = "none";
			
			var elem = e.target.parentElement;
			var item = elem.getAttribute("data-item");
			todo[item] = value.value;
			localStorage.setItem("todo", JSON.stringify(todo));

		}			
	}
}