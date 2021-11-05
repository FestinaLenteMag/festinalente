		String.prototype.tpl = function(o) { 
			var r = this ; 
			for (var i in o) { 
				r = r.replace(new RegExp("\\$"+i, 'g'),o[i])  
			} 
			return r 
		}
		
		var listItemTpl_a = `<li><a class="dropdown-item" href='#' onclick='custom_load_a("$url")'>$label</a></li>`
		var listItemTpl_b = `<li><a class="dropdown-item" href='#' onclick='custom_load_b("$url")'>$label</a></li>`
		var listItemTpl_c = `<li><a class="dropdown-item" href='#' onclick='custom_load_c("$url")'>$label</a></li>`
		
		$(document).ready(main);

		function main() {
			$.ajax({
				method: 'GET',
				url: '../js/ebook_filelist.json',
				success: function(d) {
					for (var i=0; i<d.length; i++) {
						$('#list_a').append(listItemTpl_a.tpl({url:d[i].url, label: d[i].label}))
					}
					for (var i=0; i<d.length; i++) {
						$('#list_b').append(listItemTpl_b.tpl({url:d[i].url, label: d[i].label}))
					}
					for (var i=0; i<d.length; i++) {
						$('#list_c').append(listItemTpl_c.tpl({url:d[i].url, label: d[i].label}))
					}
				},
				error: function() {
					alert('No document to show')
				}
			});
			
			$('#showperson').click(function() {
				console.log("show person");
				if (this.checked) 
					$('.mention-person').addClass('text-person')
				else
					$('.mention-person').removeClass('text-person')
			})
			$('#showplace').click(function() {
				console.log("show place");
				console.log(this.checked);
				if (this.checked) 
					$('.mention-place').addClass('text-place')
				else
					$('.mention-place').removeClass('text-place')
			})
			$('#showconcept').change(function() {
				console.log("show concept");
				if (this.checked) 
					$('.mention-concept').addClass('text-concept')
				else
					$('.mention-concept').removeClass('text-concept')
			})
			$('#showorganisation').change(function() {
				if (this.checked) 
					$('.mention-organisation').addClass('text-organisation')
				else
					$('.mention-organisation').removeClass('text-organisation')
			})
			$('#showtool').change(function() {
				if (this.checked) 
					$('.mention-tool').addClass('text-tool')
				else
					$('.mention-tool').removeClass('text-tool')
			})
			
		}
		
		//custom_load per spazio articolo 1
		function custom_load_a(file) {
			$.ajax({
				method: 'GET',
				url: file,
				success: function(d) {
					$('#article_1').html(d)
					$('#title').html($('#article_1 h1'))
					$('.show').prop("checked", false)
					filltabs_a()
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}
		
		//custom_load per spazio articolo 2
		function custom_load_b(file) {
			$.ajax({
				method: 'GET',
				url: file,
				success: function(d) {
					$('#article_2').html(d)
					$('#title').html($('#article_2 h1'))
					$('.show').prop("checked", false)
					filltabs_b()
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}
		
		//custom_load per spazio articolo 3
		function custom_load_c(file) {
			$.ajax({
				method: 'GET',
				url: file,
				success: function(d) {
					$('#article_3').html(d)
					$('#title').html($('#article_3 h1'))
					$('.show').prop("checked", false)
					filltabs_c()
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}
		
		function filltabs_a(){
			filltab_a("#article_1 .mention-person","list-person","#person_a")
			filltab_a("#article_1 .mention-place","list-place","#place_a")
			filltab_a("#article_1 .mention-concept","list-concept","#concept_a")
			filltab_a("#article_1 .mention-organisation","list-organisation","#organisation_a")
			filltab_a("#article_1 .mention-tool","list-tool","#tool_a")
		}
		
		function filltabs_b(){
			filltab_b("#article_2 .mention-person","list-person","#person_b")
			filltab_b("#article_2 .mention-place","list-place","#place_b")
			filltab_b("#article_2 .mention-concept","list-concept","#concept_b")
			filltab_b("#article_2 .mention-organisation","list-organisation","#organisation_b")
			filltab_b("#article_2 .mention-tool","list-tool","#tool_b")
		}
			
		function filltabs_c(){	
			filltab_c("#article_3 .mention-person","list-person","#person_c")
			filltab_c("#article_3 .mention-place","list-place","#place_c")
			filltab_c("#article_3 .mention-concept","list-concept","#concept_c")
			filltab_c("#article_3 .mention-organisation","list-organisation","#organisation_c")
			filltab_c("#article_3 .mention-tool","list-tool","#tool_c")
		}
		
		function filltab_a(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto_a('$place')">$content</a></li>`
			var elements = $(what); 
			$(where+' ul').empty(); 
			$.each($(what), function(i, metadataItem){
				$(where+' ul').append(list.tpl({
					style:style, 
					place: '#'+elements[i].id,
					content: elements[i].innerHTML
				}) )
			})
		}
		
		function goto_a(id) {
			var normal_name = $(id).attr("about");
			console.log(normal_name)
			
			var selected_mentions = $("[about = "normal_name"]")
			console.log(selected_mentions)
			
			$(selected_mentions).addClass('text-organisation');
			setTimeout(function(){
				$(selected_mentions).removeClass('text-organisation');
			},5000);
		}
		
		function filltab_b(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto_b('$place')">$content</a></li>`
			var elements = $(what); 
			$(where+' ul').empty(); 
			$.each($(what), function(i, metadataItem){
				$(where+' ul').append(list.tpl({
					style:style, 
					place: '#'+elements[i].id,
					content: elements[i].innerHTML
				}) )
			})
		}
		
		function goto_b(id) {
			var t = $(id).offset().top;
			console.log(t)
			var container_b = $('#article_2')
			container_b.animate({ scrollTop: t }, 200);
			$(id).addClass('animate');
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
		}
		
		function filltab_c(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto_c('$place')">$content</a></li>`
			var elements = $(what); 
			$(where+' ul').empty(); 
			$.each($(what), function(i, metadataItem){
				$(where+' ul').append(list.tpl({
					style:style, 
					place: '#'+elements[i].id,
					content: elements[i].innerHTML
				}) )
			})
		}
		
		function goto_c(id) {
			var t = $(id).offset().top;
			console.log(t)
			var container_c = $('#article_3')
			container_c.animate({ scrollTop: t }, 200);
			$(id).addClass('animate');
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
		}
		